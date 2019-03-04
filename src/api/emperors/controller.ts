import { loadEmperors, saveEmperors, loadUsers } from "../../utils/files";

let emperors;
loadEmperors(emperorsData => emperors = emperorsData);

let users;
loadUsers(usersData => users = usersData);

export function getUsers() {
  return users;
}

export function getUser(userId) {
  return users.find(user => user.id === userId);
}

export function getLiveEmperors() {
  return emperors.filter(emperor => emperor.live === true);
}

export function getEmperor(emperorId) {
  return emperors.find(emperor => emperor.id === emperorId);
}

export function getEmperors() {
  return emperors;
}

export function newEmperor(emperor, callback) {
  emperor.id = `${emperors.length + 1}`;
  emperors.push(emperor);

  saveEmperors(emperors, err => callback(err, emperors));
}

export function updateEmperor(emperor, callback) {
  const emperorId = emperor.id;
  const emperorPosition = emperors.findIndex(emperor => emperor.id === emperorId);
  if (emperorPosition >= 0) {
    emperors[emperorPosition] = emperor;
  }

  saveEmperors(emperors, err => callback(err, emperors));
}

export function deleteEmperor(emperorId, callback) {
  const emperorPosition = emperors.findIndex(emperor => emperor.id === emperorId);
  if (emperorPosition >= 0) {
    emperors.splice(emperorPosition, 1);
  }

  saveEmperors(emperors, err => callback(err, emperors));
}

export function setLiveEmperor(emperorId, liveValue, callback) {
  const emperor = emperors.find(emperor => emperor.id === emperorId);
  if (emperor) {
    emperor.like = liveValue;
  }

  saveEmperors(emperors, err => callback(err, emperors));
}
