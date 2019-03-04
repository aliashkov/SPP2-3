import { readFile, writeFile } from "fs";

export function loadEmperors(callback) {
  const filePath = __dirname + '/../../data/emperors.json';
  readFile(filePath, (err, data) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(data.toString()));
    }
  });
}

export function loadUsers(callback) {
  const filePath = __dirname + '/../../data/users.json';
  readFile(filePath, (err, data) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(data.toString()));
    }
  });
}

export function saveEmperors(emperors, callback) {
  const filePath = __dirname + '/../../data/emperors.json';
  const emperorsJSON = JSON.stringify(emperors);
  writeFile(filePath, emperorsJSON, err => {
    if (err) {
      callback(err);
    } else {
      callback();
    }
  });
}
