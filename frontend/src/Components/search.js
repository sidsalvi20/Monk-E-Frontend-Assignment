import React, { useContext,useRef } from "react";
import './search.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import cat1 from "../../src/Images/cat1.jpg";
import cat2 from "../../src/Images/cat2.jpg";
import cat3 from "../../src/Images/cat3.jpg";
import cat4 from "../../src/Images/cat4.jpg";
import dog2 from "../../src/Images/dog2.jpg";
import dog3 from "../../src/Images/dog3.jpg";
import dog4 from "../../src/Images/dog4.jpg";
import dog5 from "../../src/Images/dog5.jpg";
import dog6 from "../../src/Images/dog6.jpg";

import dog1 from "../../src/Images/dog1.webp";
import { Slide,Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
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
import { ListItemText } from "@material-ui/core";

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
	const slideRef1 = useRef();
	const slideRef2 = useRef();
	const slideRef3 = useRef();
	
	
	const {pets, addPet,editPet, deletePet} = useContext(petContext);
	const [searchTerm, setSearchTerm] = React.useState("");
	const [loading,setLoading] = React.useState(true);
	const [petName,setPetName] = React.useState("");
	const [petKey, setPetKey] = React.useState(null);
	const [petSpecies,setPetSpecies] = React.useState("");

	const [searchResults, setSearchResults] = React.useState([]);

	const style = {
		textAlign: "center",
		'backgroundImage': `url(${dog4})`,
		backgroundRepeat: "no-repeat",
		padding: "200px 0",
		fontSize: "30px"
	  };
	
	  const properties = {
		autoplay: false,
		arrows: true,
		prevArrow:<div></div>
	  };
	
	  
	
	  const back = () => {
		slideRef1.current.goBack();
	  }
	
	  const next1 = () => {
		slideRef1.current.goNext();
	  }

	  const next2 = () => {
		slideRef2.current.goNext();
	  }

	  const next3 = () => {
		slideRef3.current.goNext();
	  }
	
	  const goto = ({ target }) => {
		slideRef1.current.goTo(parseInt(target.value, 10));
	  }
	
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

	var dog_arr = [dog1,dog2,dog3,dog4,dog5,dog6];

	var cat_arr = [cat1,cat2,cat3,cat4];

	var func_arr = [next1,next2,next3];
	var ref_arr = [slideRef1,slideRef2,slideRef3];

	



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
			<Grid container spacing={4}>
				{pets && pets.filter((sub) =>
			sub.name.toLowerCase().includes(searchTerm.toLowerCase())
		).map((item,key) => {
			
					return (
						<Grid item xs = {6}>
						<Paper style = {{background:"#efd7fa",width:"32vw"}} elevation = {3} 
				
						>
					<Fade {...properties}>
			  {item.species === "dog" ? 
			  <div  style={{
				textAlign: "center",
				'backgroundImage': `url(${dog_arr[item.name.length % 6]})`,
				backgroundRepeat: "no-repeat",
				padding: "200px 0",
				fontSize: "30px"
			}} >
			  <h1 className = "heading">{item.name}</h1>
			  
			</div>
			  : 
			  <div style={{
				textAlign: "center",
				'backgroundImage': `url(${cat_arr[item.name.length % 4]})`,
				backgroundRepeat: "no-repeat",
				padding: "200px 0",
				fontSize: "30px"
			}} >
			  <h1 className = "heading">{item.name}</h1>
			  
			</div>
			  }			
			  
			  <div  >
			  <div
										style={
											item.species === 'dog'? 
											{
												height: "60%",
												
												'backgroundImage': `url(${dog_arr[item.name.length % 6]})`,
												
												borderRadius: "10px",
												paddingLeft: "10px",
												paddingRight: "10px",
											}
											: 
											{
											height: "60%",
											
											'backgroundImage': `url(${cat_arr[item.name.length % 4]})`,
											borderRadius: "10px",
											paddingLeft: "10px",
											paddingRight: "10px",
										}}
									>
										<Grid container spacing={2}>
											<Grid item xs={8}>
												<h1 className = "card-head" style={{ color: "white" }}>
													{item.name}
												</h1>
												<p className = "heading" style={{ fontSize:"30px",marginLeft: "10px" }}>{item.species}</p>
											</Grid>
											<Grid item xs={4}>
												<img
													
													style={{ height: "220px", marginTop: "10px" }}
												/>
											</Grid>
										</Grid>
									</div>
									<Grid container spacing = {2}>
										<Grid item xs = {6}>
										<h1 className = "heading" style={{ color:"#b52cc7",fontSize:"30px",margin: "20px" }}>LIKES</h1>	
										{item.foods.likes.map(like => <h1 style={{color:"white",margin: "20px" }}>{like}</h1>)}
										
										</Grid>
										<Grid item xs = {6}>
										<h1 className = "heading" style={{color:"#b52cc7" ,fontSize:"30px",margin: "20px" }}>DISLIKES</h1>
										{item.foods.dislikes.map(like => <h1 style={{color:"white",margin: "20px" }}>{like}</h1>)}
										
										</Grid>
									</Grid>
									<Grid container spacing = {2}>
										<Grid item xs = {6}>
										<Button
										style={{ marginLeft: "20px" }}
										variant="outlined"
										color="primary"
										onClick = {() => handleEdit(key, item.name, item.species)}
										
										
									>
										EDIT
									</Button>

										</Grid>
										<Grid item xs = {6}>
										<Button
										style={{ marginLeft: "20px" }}
										variant="outlined"
										color="primary"
										onClick = {() => deletePet(key)}
										
									>
										DELETE
									</Button>
										</Grid>
									</Grid>
									
									
									
									
									
			  </div>
			
			 
			</Fade>
						</Paper>
						
					</Grid>
	
					);
				})}
			</Grid>

		

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
		<Grid container spacing  = {2}>
			<Grid item xs = {3}>

			</Grid>
			<Grid item xs = {9}>
				<CircularProgress color = "primary" />
			</Grid>
		</Grid>	
		} 
			
		</div>
	);
}
