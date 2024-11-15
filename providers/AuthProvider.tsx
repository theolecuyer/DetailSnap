import { supabase } from "@/lib/supabase";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

type AuthData = {
    session: Session | null
    loading: boolean
    profile: any
};

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null,
});

export default function AuthProvider({children}: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<any | null>(null);
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
                setProfile(profileData || null)
            }
            setLoading(false);
        }
        fetchSession();
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })
    }, [])
    console.log(profile);

    return <AuthContext.Provider value={{session, loading, profile}}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);