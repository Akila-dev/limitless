import { BlogFooter } from "@/components";

const layout = ({ children }) => {
  return (
    <div className="relative">
      {children}
      <BlogFooter />
    </div>
  );
};

export default layout;
