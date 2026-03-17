import { createContext, useContext, useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';

// ── Create the context ────────────────────────────────────────────────────────
const LocationContext = createContext({
  location: null,
  permission: 'pending',
  error: null,
  loading: true,
});

// ── Provider — wrap App.js with this ─────────────────────────────────────────
export function LocationProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [permission, setPermission] = useState('pending');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const watchRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const start = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (cancelled) return;

        if (status !== 'granted') {
          setPermission('denied');
          setError('Location permission denied.');
          setLoading(false);
          return;
        }

        setPermission('granted');

        // One-shot initial position so UI isn't blank
        const initial = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        if (cancelled) return;

        setLocation({
          latitude: initial.coords.latitude,
          longitude: initial.coords.longitude,
          accuracy: initial.coords.accuracy,
        });
        setLoading(false);

        // Live stream — updates every 5s or 10m, whichever comes first
        watchRef.current = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          (pos) => {
            if (!cancelled) {
              setLocation({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                accuracy: pos.coords.accuracy,
              });
            }
          }
        );
      } catch (err) {
        if (!cancelled) {
          setError('Could not get location: ' + err.message);
          setLoading(false);
        }
      }
    };

    start();

    return () => {
      cancelled = true;
      if (watchRef.current) {
        watchRef.current.remove();
        watchRef.current = null;
      }
    };
  }, []);

  return (
    <LocationContext.Provider value={{ location, permission, error, loading }}>
      {children}
    </LocationContext.Provider>
  );
}

// ── Hook — use this in any screen instead of useLocation ─────────────────────
export function useLocation() {
  return useContext(LocationContext);
}