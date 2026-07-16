import { supabase } from "./supabase";

export const login = ({email , password}) => {
    return supabase.auth.signInWithPassword({
        email,
        password
    })
}

export const logOut = async () => {
    const { error } = await supabase.auth.signOut();
     
    if (error) {
        throw error;
    }
};

export const getCurrentUser = async () => {
    const {
        data: { user },
        error
    } = await supabase.auth.getUser()

    if (error) {
        return null
    }

    return user
}

export const signUP = async({email , password , name , profile_pic})=>{

     let   profilePicUrl = null ;
     if(profile_pic){

         const filename = `dp-${Date.now()}-${profile_pic.name}`;
         const { error : storageError } = await supabase.storage.from('Profile_Pic').upload(filename, profile_pic);
         if(storageError) {
             throw storageError;
            }
         profilePicUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/Profile_Pic/${filename}`
        }
            const { data: { user  } , error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name,
                        profile_pic: profilePicUrl ? profilePicUrl : null
                    }
                }
            })
    if(error) {
        throw error;
    }else {
        return user;
    }

}