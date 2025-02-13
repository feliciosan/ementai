export default function EmentaiRights() {
  return (
    <div className="flex items-center justify-between pb-4 px-4 pt-4 text-center bg-gray-50">
      <a href="https://www.emantai.com" className="text-xs inline-block">
        Powered by Ementai
      </a>
      <p className="text-xs inline-block">
        Ementai ©{new Date().getFullYear()} All rights reserved.
      </p>
    </div>
  );
}
