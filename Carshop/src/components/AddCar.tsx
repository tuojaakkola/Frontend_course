import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Car } from "../types";

type AddCarProps = {
  fetchCars: () => void;
};

export default function AddCar(props: AddCarProps) {
  const [car, setCar] = useState<Car>({} as Car);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error when saving the car");

        return response.json();
      })
      .then(() => {
        props.fetchCars();
        handleClose();
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Car
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
          <Button onClick={handleSave}> Save </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
