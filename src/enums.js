export const ShelfType = {
    CurrentlyReading: "currentlyReading",
    WantToRead: "wantToRead",
    HaveRead: "read"
  };

export const ShelfTypeString = {
    [ShelfType.CurrentlyReading]: "Currently Reading",
    [ShelfType.WantToRead]: "Want To Read",
    [ShelfType.HaveRead]: "Have Read",
};

export const BookShelfStatus = {
  CurrentlyReading: ShelfType.CurrentlyReading,
  WantToRead: ShelfType.WantToRead,
  HaveRead: ShelfType.HaveRead,
  Move: "move",
  None: "none"
}