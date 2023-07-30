import { getCurrentUser } from "@/app/_action/getCurrentUser";
import { CreatePostForm } from "@/app/_components/CreatePostForm";
import { redirect } from "next/navigation";


const CreatePost = async() => {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    redirect("/")

  }
  return <CreatePostForm currentUser={currentUser}/>
}

export default CreatePost

