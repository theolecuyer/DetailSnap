import { supabase } from "@/lib/supabase";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

type AuthData = {
    session: Session | null;
    loading: boolean;
    profile: any;
    group: any;
};

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null,
    group: null,
});

export default function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<any | null>(null);
    const [group, setGroup] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    // Function to fetch session data
    const fetchSession = async (sessions: Session | null) => {
        setLoading(true);
        if (sessions) {
            setSession(sessions);
            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', sessions.user.id)
                .single();
            setProfile(profileData || null);

            if (profileData?.group_id) {
                const { data: groupData } = await supabase
                    .from('groups')
                    .select('*')
                    .eq('id', profileData?.group_id)
                    .single();
                setGroup(groupData || null);
            }
        } else {
            setSession(null);
            setProfile(null);
            setGroup(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        const fetchInitialSession = async () => {
            const { data } = await supabase.auth.getSession();
            fetchSession(data.session);
        };
        fetchInitialSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
            fetchSession(session);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return <AuthContext.Provider value={{ session, loading, profile, group }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
