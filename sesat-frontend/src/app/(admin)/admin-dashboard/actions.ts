'use server'
 
import { revalidateTag } from 'next/cache'
 
export default async function revalidator(tag: string) {
  revalidateTag(tag);
}