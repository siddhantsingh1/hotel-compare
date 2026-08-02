/**
 * Remote stock photography stands in for the striped placeholders in the
 * prototypes. Photo tiles keep a neutral fill behind the image, so the layout
 * still reads correctly if a fetch fails.
 */
const unsplash = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const hotelPhotos: Record<string, string[]> = {
  'ocean-pearl': [
    unsplash('1571003123894-1f0594d2b5d9', 800),
    unsplash('1582719508461-905c673771fd', 800),
    unsplash('1590490360182-c33d57733427', 800),
    unsplash('1551882547-ff40c63fe5fa', 800),
  ],
  'palm-grove': [
    unsplash('1445019980597-93fa8acb246c', 800),
    unsplash('1611892440504-42a792e24d32', 800),
    unsplash('1540541338287-41700207dee6', 800),
  ],
  'grand-vista': [
    unsplash('1566073771259-6a8506099945', 800),
    unsplash('1618773928121-c32242e63f39', 800),
    unsplash('1520250497591-112f2f40a3f4', 800),
  ],
};

export const roomPhotos = [
  unsplash('1590490360182-c33d57733427', 700),
  unsplash('1611892440504-42a792e24d32', 700),
  unsplash('1584132967334-10e028bd69f7', 700),
  unsplash('1582719478250-c89cae4dc85b', 700),
];

export const cityPhotos: Record<string, string> = {
  Goa: unsplash('1512343879784-a960bf40e7f2', 400),
  Manali: unsplash('1477587458883-47145ed94245', 400),
  Jaipur: unsplash('1524492412937-b28074a5d7da', 400),
  Bangkok: unsplash('1508009603885-50cf7c579365', 400),
  Dubai: unsplash('1512453979798-5ea266f8880c', 400),
  'Ubud, Bali': unsplash('1506929562872-bb421503ef21', 400),
  'Manali, Himachal Pradesh': unsplash('1477587458883-47145ed94245', 400),
  'Dubai, UAE': unsplash('1512453979798-5ea266f8880c', 400),
};

export const mapTile = unsplash('1524661135-423995f22d0b', 700);

export const platformLogos: Record<string, string> = {
  MakeMyTrip: unsplash('1607082349566-187342175e2f', 80),
  Goibibo: unsplash('1518770660439-4636190af475', 80),
  'Booking.com': unsplash('1451187580459-43490279c0fa', 80),
  Agoda: unsplash('1550745165-9bc0b252726f', 80),
  Cleartrip: unsplash('1526374965328-7f61d4dc18c5', 80),
  EaseMyTrip: unsplash('1550751827-4bd374c3f58b', 80),
  'Hotel website': unsplash('1497366216548-37526070297c', 80),
};

export const brandTile = unsplash('1560472354-b33ff0c44a43', 300);
