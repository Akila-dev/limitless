import { Text4R3F, SubscribeForm } from "@/components";

const NewsLetterSubscribe = () => {
  return (
    <div>
      <Text4R3F
        title="Newsletter Subscribe"
        titleClassName="h3 uppercase !font-base !leading-[1]"
        paragraph="Subscribe to our newsletter"
        onlyOnce
      >
        <SubscribeForm />
      </Text4R3F>
    </div>
  );
};

export default NewsLetterSubscribe;
