export function clsx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const site = {
  name: "Игровые клавиатуры",
  url: "https://example.com",
  description:
    "Игровые клавиатуры — особая компьютерная периферия для тех, кто увлекается играми. Красивый внешний вид, удобство и дополнительные функции.",
  locale: "ru-RU",
};
