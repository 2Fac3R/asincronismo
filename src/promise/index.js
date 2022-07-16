const somethingWillHappen = () => {
  return new Promise((resolve, reject) => {
    (true)
      ? resolve('Ok')
      : reject('Nope');
  });
};

somethingWillHappen()
  .then(response => console.log(response))
  .catch(err => console.error(err));