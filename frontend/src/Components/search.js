import React, { useContext } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import image1 from "../../src/1.png";
import image2 from "../../src/2.png";
import image3 from "../../src/3.png";
import image4 from "../../src/4.png";
import image5 from "../../src/5.png";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import petContext from "../Context/pet-context";

import { useHistory } from "react-router-dom";

import axios from "axios";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	  },
	  form: {
		borderRadius: "10px",
		boxShadow:
		  " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
		padding: "20px",
	  },
}));

export default function PetSearch() {
	const classes = useStyles();
	const theme = useTheme();

	
	const {pets, addPet,editPet, deletePet} = useContext(petContext);
	const [searchTerm, setSearchTerm] = React.useState("");
	const [loading,setLoading] = React.useState(true);
	const [petName,setPetName] = React.useState("");
	const [petKey, setPetKey] = React.useState(null);
	const [petSpecies,setPetSpecies] = React.useState("");

	const [searchResults, setSearchResults] = React.useState([]);



	const handleChange1 = (event) => {
		setSearchTerm(event.target.value);
	};
	const [open, setOpen] = React.useState(false);

	const handleEdit = (key, name, species) => {
		setPetKey(key);
		setPetName(name);
		setPetSpecies(species);
		setOpen(true);
	}


	React.useEffect(() => {
		axios
			.get(
				"https://raw.githubusercontent.com/LearnWebCode/json-example/master/animals-1.json"
			)
			.then((response) => {
				console.log(response.data);
				response.data.map((dat) => addPet(dat));
				
				setLoading(false);
                
               
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const subject_data = [
		{ title: "MACHINE LEARNING", teacher: "Prof K. Sharma" },
		{ title: "DATA MINING", teacher: "Prof K. Sharma" },
		{ title: "COMPILERS", teacher: "Prof K. Sharma" },
		{ title: "APPLIED MATHS", teacher: "Prof K. Sharma" },
		{ title: "WEB DEV", teacher: "Prof K. Sharma" },
		{ title: "APPLIED PHYSICS", teacher: "Prof K. Sharma" },
	];

	

	var color_arr = [
		"#fa87e1",
		"#aba4fc",
		"#f7faa7",
		"#f58ca2",
		"#e59ffc",
		"#fff899",
		"#b9b3ff",
		"#b1bdfa",
		"#f7a1e6",
		"#fcb290",
	];

	var image_arr = [image1, image2, image3, image4, image5];

	



	const handleClose = () => {
		setOpen(false);
	};

	console.log("PETS");
	console.log(pets);
	return (

		<div>
			{!loading ? 
			<div>
			<Grid
				container
				spacing={3}
				direction="row"
				justify="flex-start"
				alignItems="center"
			>
				<Grid item xs={4}></Grid>
				<Grid item xs={5}>
					<TextField
						value = {searchTerm}
						style={{ width: "400px" }}
						onChange={handleChange1}
						id="outlined-basic"
						label="Search"
						variant="outlined"
					/>
				</Grid>
				<Grid className="icons" item xs={3}></Grid>
			</Grid>
			<br />
			<Grid container spacing={2}>
				{pets && pets.filter((sub) =>
			sub.name.toLowerCase().includes(searchTerm.toLowerCase())
		).map((item,key) => {
					return (
						<Grid item xs={4}>
							<Paper
								elevation={3}
								style={{
									height: "300px",
									borderRadius: "10px",
									paddingTop: "10px",
									paddingBottom: "10px",
								}}
							>
								<div
									style={{
										height: "60%",
										backgroundColor: color_arr[item.name.length % 10],
										borderRadius: "10px",
										paddingLeft: "10px",
										paddingRight: "10px",
									}}
								>
									<Grid container spacing={2}>
										<Grid item xs={8}>
											<h1 style={{ color: "white" }}>
												{item.name.toUpperCase()}
											</h1>
										</Grid>
										<Grid item xs={4}>
											<img
												src={image_arr[item.name.length % 5]}
												style={{ height: "120px", marginTop: "10px" }}
											/>
										</Grid>
									</Grid>
								</div>
								<h1 style={{ marginLeft: "10px" }}>{item.species}</h1>
								{item.foods.likes.map(like => <h1>{like}</h1>)}
								
								
								<Button
									style={{ marginLeft: "10px" }}
									variant="outlined"
									color="primary"
									onClick = {() => deletePet(key)}
									
								>
									DELETE
								</Button>
								<Button
									style={{ marginLeft: "10px" }}
									variant="outlined"
									color="primary"
									onClick = {() => handleEdit(key, item.name, item.species)}
									
									
								>
									EDIT
								</Button>
							</Paper>
						</Grid>
					);
				})}
			</Grid>
			<br />

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"EDIT PET DETAILS : "}
				</DialogTitle>
				<DialogContent>
				<div className={classes.form}>
          <form className={classes.container} noValidate>
            
            <br />
            <br />
            <TextField
              required
              id="standard-required"
              label="Enter Name"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              fullWidth
            />
			<TextField
              required
              id="standard-required"
              label="Enter Species"
              value={petSpecies}
              onChange={(e) => setPetSpecies(e.target.value)}
              fullWidth
            />
			<br />
			<br />

           
          </form>
		  <Button
              variant="contained"
              color="primary"
              onClick = {() => editPet(petKey, petName, petSpecies)}
            >
             SUBMIT
            </Button><br /><br />
            <Typography variant = "p" style = {{color:"green"}}>{"EDIT SUCCESSFULL"}</Typography>
		  </div>
				</DialogContent>
				<DialogActions>
					
					<Button onClick={handleClose} color="primary" autoFocus>
						CLOSE
					</Button>
				</DialogActions>
			</Dialog>
			</div>
			: 
			
			<h1>PAGE LOADING</h1>} 
			
		</div>
	);
}
