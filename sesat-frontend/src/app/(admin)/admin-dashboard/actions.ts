'use server'
 
import { revalidateTag } from 'next/cache'
 
export default async function revalidator(tag: string) {
  console.log("hey Im revalidating ::)")
  revalidateTag(tag);
}