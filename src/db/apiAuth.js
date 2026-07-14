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
        throw error.message;
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

export const signUP = async({email , password , name , pofile_pic})=>{
    const filename = `dp-${Date.now()}-${pofile_pic.name}`;
    const { error : storageError } = await supabase.storage.from('Profile_Pic').upload(filename, pofile_pic);
    if(storageError) {
        throw storageError.message;
    }
    const { data: { user  } , error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                pofile_pic:`${process.env.VITE_SUPABASE_URL}//storage/v1/object/public/Profile_Pic/${filename}`
            }
        }
    })
    if(error) {
        throw error.message;
    }else {
        return user;
    }

}