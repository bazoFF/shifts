export const Tracks: string[] = generateTracks();

function generateTracks(): string[] {
    const tracks = [];

    for (let i = 1; i <= 7; i++) {
        tracks.push(`Грузовик ${i}`);
    }

    return tracks;
}
