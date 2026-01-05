export function getUserRedirect(
  role: string,
  id: string
): string {
  return role === "artist"
    ? `/artist/${id}`
    : `/profile/${id}`;
}
