export default function sw() {
    navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`);
}