import DropDown from "./DropDown";

const Header = ({ onDeleteChats }) => {
  return (
    <header className="w-full bg-zinc-800">
      <div className="mx-auto max-w-[700px] w-full text-white flex items-center justify-between py-3 px-4">
        <img className="w-10" src="/images/logoGPT.png" alt="logo-ChatGPT" />
        <h1 className="font-bold select-none text-xl">ChattyAi</h1>
        <DropDown onDeleteChats={onDeleteChats} />
      </div>
    </header>
  );
};

export default Header;
