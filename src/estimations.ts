export const estimations: number[] = [1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32];

export function formatHours(totalHours: undefined): undefined;
export function formatHours(totalHours: number): string;
export function formatHours(totalHours: number | undefined): string | undefined;
export function formatHours(totalHours: number | undefined) {
  if (totalHours == null) {
    return undefined;
  }

  const days = Math.floor(totalHours / 8);
  const hours = totalHours % 8;

  return (days > 0 ? `${days}d` : "") + " " + (hours > 0 ? `${hours}h` : "");
}
