import type { User } from "@prisma/client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  AspectRatio,
  Textarea,
  Button,
  Text,
  Container,
  Heading,
} from "@/app/_lib/chakra";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

const schema = z.object({
  title: z.string().min(1, { message: "タイトルを入力してください。" }),
  image: z.string().nullish(),
  content: z.string().min(1, { message: "入力してください。" }),
});

type SchemaType = z.infer<typeof schema>;

export const CreatePostForm = ({ currentUser }: { currentUser: User }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SchemaType> = async (value) => {
    setLoading(true);

    try {
      const res = await axios.post("/api/posts", value);
      if (res.status === 200) {
        toast.success("投稿しました!");
        router.push("/");
      }
    } catch (error) {
      toast.error("エラーが発生しました。" + error);
      return;
    } finally {
      setLoading(false);
    }
    console.log(value);
  };

  return (
    <section>
      <Heading as="h1">新規投稿</Heading>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>投稿のタイトル</FormLabel>
            <FormHelperText>投稿のタイトルを入力してください。</FormHelperText>
            <Input
              id="title"
              placeholder="medium size"
              size="md"
              disabled={loading}
              {...register("title")}
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.content}>
            <FormLabel>投稿の内容</FormLabel>
            <FormHelperText>投稿の内容を入力してください。</FormHelperText>
            <Textarea
              id="content"
              placeholder="Here is a sample placeholder"
              disabled={loading}
              {...register("content")}
            />
            <FormErrorMessage>
              {errors.content && errors.content.message}
            </FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="blue" disabled={loading}>
            Button
          </Button>
        </form>
      </Box>
    </section>
  );
};
