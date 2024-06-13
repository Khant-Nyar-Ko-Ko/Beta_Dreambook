/* eslint-disable @typescript-eslint/no-explicit-any */
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { useGetChapter } from "@/hooks/useChapterApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReadChapterPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [readbookId, setReadbookId] = useState("");
  const { data: chapterData } = useGetChapter({ bookId: readbookId });
  const [chapter, setChapter] = useState<any[]>([]);

  useEffect(() => {
    if (bookId) {
      setReadbookId(bookId);
    }
  }, []);

  useEffect(() => {
    if (chapterData) {
      setChapter(chapterData);
    }
  }, [chapterData]);

  if (!chapter) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex ">
      <div className="flex flex-col w-1/5 h-[700px] gap-4 px-10 py-5 border-r-2">
        <BackButton />
        <p className="text-xl font-semibold font-primary">Chapters</p>
        {chapter?.map((chapter: any) => (
          <p>
            {chapter.id} : {chapter.title}
          </p>
        ))}
      </div>
      <div className="flex flex-col justify-between w-4/5 gap-5 px-20 py-10 h-[700px]">
        <h4 className="text-2xl font-semibold font-primary text-default">
          1 : Our Vision is Limited{" "}
        </h4>
        <p className="overflow-scroll text-lg text-justify font-primary">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
          quasi hic voluptate veritatis corrupti veniam quis iusto dolores atque
          eum odio illo nobis rerum! Nihil, totam est. Saepe, consequuntur
          error! Quidem magnam sequi eum dignissimos nemo! Accusamus omnis nisi
          totam quibusdam, aspernatur ut dolorum numquam similique pariatur sunt
          reprehenderit temporibus illum quasi hic dolores magnam non, iusto
          repellendus laudantium ipsa. Repudiandae quibusdam quae optio iste ab
          magnam consequuntur aspernatur ea, temporibus sunt, autem nobis
          placeat labore alias, mollitia fugiat. Dolorum sapiente eius odit.
          Quod perspiciatis harum, delectus sunt assumenda ducimus? Molestiae
          provident esse ut expedita. Est ipsum ut deleniti similique nam illum
          quo impedit nisi rem atque, officia quisquam earum quae perferendis
          tempora quasi ullam. Iste expedita optio illum maxime. Rem sed
          mollitia tempora quam molestiae esse asperiores inventore natus.
          Corporis fugiat sequi vel ipsum, quaerat quae minima, reprehenderit
          tenetur sunt enim deserunt sed a praesentium dolores. Earum,
          aspernatur unde? Pariatur omnis tempore, asperiores corrupti autem,
          recusandae ipsam non, consectetur nemo fuga impedit? Doloremque
          accusantium dolorum, eius, illo amet quod nesciunt placeat dicta
          minima quae, nostrum vel ipsum iure sed. Minima illo, deserunt velit,
          fugiat eligendi porro at vero tempore quibusdam animi vel consectetur
          eveniet neque dolore delectus, consequatur accusantium aspernatur
          incidunt. Non omnis et ullam. Dolores, laboriosam. Repudiandae,
          accusamus! Dolore quidem harum ipsa quis et, odio molestiae voluptates
          doloremque animi ullam molestias consequuntur a qui aut fuga
          doloribus. Doloribus sunt dolore tenetur alias facilis cumque sed
          dolorem culpa id? Blanditiis optio magni enim facilis architecto esse
          earum laboriosam, aspernatur natus vero beatae vel et doloribus iste
          voluptatem? Doloremque accusantium sed inventore quia, error incidunt
          temporibus quis doloribus veritatis odio! Alias dolore, quas dicta
          libero rerum ipsam non laudantium, quos voluptates numquam expedita,
          ratione nesciunt aut aliquam! Voluptate nihil autem dolorem
          perferendis obcaecati? Deleniti quibusdam ea minus odit natus aut.
          Enim laudantium iure, magni voluptate reiciendis ipsam dignissimos!
          Nam atque aut odio, possimus accusantium perspiciatis ex enim beatae
          sed et consectetur perferendis. Quibusdam dicta inventore molestias
          blanditiis, recusandae ut est. Voluptate, deleniti voluptatum cumque
          laboriosam, quibusdam, dignissimos pariatur corrupti fuga quisquam nam
          non similique beatae eaque eum rem? Beatae unde perferendis
          consequuntur fugiat velit enim quos quae, laboriosam delectus
          quisquam! Eos quia dolorem inventore, eveniet ab dolore ea enim eius
          ipsa! Repellendus cum aliquam minus doloremque natus! Neque similique
          corrupti aut est, laudantium eum quis dignissimos, sunt natus atque
          consequatur! Adipisci eius deserunt natus dolorum, dolor ullam, iste
          iure rerum atque voluptatum consectetur ipsum animi distinctio
          dolores. Hic dolorum doloremque possimus tenetur explicabo deleniti
          modi, eos repellendus illum. Alias, soluta! Veniam corrupti maxime
          doloremque delectus iure atque adipisci? Reiciendis maiores
          perferendis, excepturi aliquam placeat explicabo rem, voluptatum
          accusantium sequi quisquam autem quo fuga doloremque quibusdam saepe
          incidunt eos fugit corrupti.
        </p>
        <div className="flex items-center justify-between">
          <Button>Previous</Button>
          <p>1/5</p>
          <Button>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default ReadChapterPage;
