import { apiBaseUrl } from '../config';
import { Spawn } from '../types/Spawn';
import axios from 'axios';
let BACKOFF = 1000;
const LINEAR_BACKOFF = 1000;
const MAX_BACKOFF = 10000;
const DEFAULT_LATENCY = 1000;

/**
 * Description: Long polling with backoff and retry on failure
 * @param action: (entities: T[]) => void - callback function to update state
 * @param uri: string - uri to poll
 * @param latency: number - latency between polls
 * @returns void
 * Example Usage:
 * const [spawns, setSpawns] = useState<Spawn[]>([]);
 * const [streamEntities, stop] = makeStreamEntities();
 * useEffect(() => {
 *  streamEntities(setSpawns, '/spawn');
 * return () => stop();
 * }, []);
 */
export function makeStreamEntities<T>(token: string | null = null) {
  let isStopped = true;

  function stop() {
    if (isStopped) {
      console.error('stop can only be called once');
      return;
    }
    isStopped = true;
  }

  async function streamEntities<T>(
    action: (entities: T[]) => void,
    uri: string,
    latency: number = DEFAULT_LATENCY
  ) {
    if (!isStopped) {
      console.error('streamEntities can only be called once');
      return;
    }
    isStopped = false;
    const url = apiBaseUrl + uri;
    window.requestAnimationFrame(async function poll() {
      try {
        let response;
        if (token) {
          response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        } else {
          response = await axios.get(url);
        }
        const entities = response.data as T[];
        action(entities);
        BACKOFF = 1000;
        if (isStopped) return;
        setTimeout(() => window.requestAnimationFrame(poll), latency);
      } catch (e) {
        console.error(e);
        BACKOFF = Math.min(BACKOFF + LINEAR_BACKOFF, MAX_BACKOFF);
        setTimeout(() => window.requestAnimationFrame(poll), BACKOFF);
      }
    });
  }
  return [streamEntities, stop] as const;
}
