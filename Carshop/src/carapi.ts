export function getCars() {
    return fetch(import.meta.env.VITE_API_URL)
        .then((response) => {
        if (!response.ok) throw new Error("Error when fetching the cars");
        return response.json();
        })
}


export function deleteCar(url:string) {
    return fetch(url, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) throw new Error("Error when deleting the car: ");
          return response.json();
        })
}