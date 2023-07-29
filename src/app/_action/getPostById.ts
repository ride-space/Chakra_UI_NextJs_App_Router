import prisma from "@/app/_lib/prisma";

export const getPostById = async ({ postId }: { postId: string }) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    if (!post) {
      return null;
    }
    return post
  } catch (e) {
    console.error(e);
    return null;
  }
};
