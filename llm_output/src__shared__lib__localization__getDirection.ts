export function getDirection(language: string): "rtl" | "ltr" {
  return language == "ar" ? "rtl" : "ltr";
}
