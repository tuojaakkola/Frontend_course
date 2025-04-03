import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Car } from "../types";
import { CarData } from "../types";

type EditCarProps = {
  data: CarData;
  fetchCars: () => void;
};

export default function EditCar(props: EditCarProps) {
  const [car, setCar] = useState<Car>({} as Car);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setCar({
      brand: props.data.brand,
      model: props.data.model,
      color: props.data.color,
      fuel: props.data.fuel,
      modelYear: props.data.modelYear,
      price: props.data.price,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    fetch(props.data._links.car.href, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((Response) => {
        if (!Response.ok) throw new Error("Error when updating the car");
        return Response.json();
      })
      .then(() => props.fetchCars())
      .then(() => handleClose())
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Button size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new car</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            name="brand"
            value={car.brand}
            onChange={(e) => setCar({ ...car, brand: e.target.value })}
            label="Brand"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="Model"
            value={car.model}
            onChange={(e) => setCar({ ...car, model: e.target.value })}
            label="Model"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="Fuel"
            value={car.fuel}
            onChange={(e) => setCar({ ...car, fuel: e.target.value })}
            label="Fuel"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="Color"
            value={car.color}
            onChange={(e) => setCar({ ...car, color: e.target.value })}
            label="Color"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="ModelYear"
            value={car.modelYear}
            type="number"
            onChange={(e) =>
              setCar({ ...car, modelYear: Number(e.target.value) })
            }
            label="Model Year"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="Price"
            value={car.price}
            type="number"
            onChange={(e) => setCar({ ...car, price: Number(e.target.value) })}
            label="Price (€)"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
