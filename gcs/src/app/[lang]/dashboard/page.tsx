import { getLocaleDict } from "@/app/[lang]/locales/locale-settings";
type LocaleType = "en-US" | "jp";

export default async function Page({
  params: { lang },
}: {
  params: { lang: LocaleType };
}) {
  const locale = await getLocaleDict(lang);

  if (!locale) {
    return <h1>Language data not found</h1>;
  }

  return (
    <>
      <h1>{locale.test}</h1>
      <p>{lang}</p>
    </>
  );
}
