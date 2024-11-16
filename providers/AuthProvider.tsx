import { supabase } from "@/lib/supabase";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

type AuthData = {
    session: Session | null
    loading: boolean
    profile: any
    group: any
};

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null,
    group: null,
});

export default function AuthProvider({children}: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<any | null>(null);
    const [group, setGroup] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession =async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            if (data.session) {
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', data.session.user.id)
                    .single()
                setProfile(profileData || null);
                const { data: groupData } = await supabase
                    .from('groups')
                    .select('*')
                    .eq('id', profileData.group_id)
                    .single()
                setGroup(groupData || null);
            }
            setLoading(false);
        }
        fetchSession();
        supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            if (session) {
                setLoading(true);
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setProfile(profileData || null);
                const { data: groupData } = await supabase
                    .from('groups')
                    .select('*')
                    .eq('id', profileData?.group_id)
                    .single();
                setGroup(groupData || null);
                setLoading(false);
            } else {
                setProfile(null);
                setGroup(null);
            }
        })
    }, [])

    return <AuthContext.Provider value={{session, loading, profile, group}}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);