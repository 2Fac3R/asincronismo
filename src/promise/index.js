const somethingWillHappen = () => {
    return new Promise((resolve, reject) => {
        (false) ? resolve('Ok') : reject('Nope');
    });
};

somethingWillHappen()
    .then(response => console.log(response))
    .catch(err => console.error(err));