
import { supabase } from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) throw error;

  return data;
}

export async function deleteUrl(id) {
  const { data, error } = await supabase
    .from("urls")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}

export async function createUrl({
  title,
  longUrl,
  customUrl,
  user_id,
  qrcode,
}) {
  const short_url = Math.random().toString(36).substring(2, 8);

  const filename = `qr-${short_url}.png`;

  // Make sure your bucket name is EXACTLY "QRs"
  const { error: storageError } = await supabase.storage
    .from("QRs")
    .upload(filename, qrcode, {
      contentType: "image/png",
      upsert: true,
    });

  if (storageError) {
    console.log(storageError);
    throw storageError;
  }

  const qrurl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/QRs/${filename}`;

  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url: longUrl,
        custom_url: customUrl || null,
        user_id,
        short_url,
        QR: qrurl,
      },
    ])
    .select();

  if (error) {
    console.log(error);
    throw error;
  }

  return data;
}
export async function getLongUrl(short_url) {

    const { data, error } = await supabase
        .from("urls")
        .select("*")
        .eq("short_url", short_url)
        .single();

    if (error)
        throw error;

    return data;
}
export async function getUrl({id,user_id}){

const {data,error}=await supabase
.from("urls")
.select("*")
.eq("id",id)
.eq("user_id",user_id)
.single();

if(error) throw error;

return data;

}