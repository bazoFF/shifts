export const Tracks = generateTracks();

function generateTracks(): number[] {
    const tracks = [];

    for (let i = 1; i <= 7; i++) {
        tracks.push(i);
    }

    return tracks;
}
