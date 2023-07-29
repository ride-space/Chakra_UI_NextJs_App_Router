import prisma from "@/app/_lib/prisma";

export const getPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return posts;
  } catch (err) {
    return [];
  }
};
