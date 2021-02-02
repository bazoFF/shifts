export const Tracks: string[] = generateTracks(); // список грузовиков

function generateTracks(): string[] {
    const tracks = [];

    for (let i = 1; i <= 7; i++) {
        tracks.push(`Грузовик ${i}`);
    }

    return tracks;
}
