const fileInput  = document.querySelector(".file-input"),
filterOptions  = document.querySelectorAll(".filter button"),
filterName  = document.querySelector(".filter-info .name"),
filterValue  = document.querySelector(".filter-info .value"),
filterSlider  = document.querySelector(".slider input"),
previewImg  = document.querySelector(".preview-img img"),
rotateOptions  = document.querySelectorAll(".rotate button"),
resetFiltersBtn = document.querySelector(".reset-filter"),
chooseImgBtn = document.querySelector(".choose-img"),
saveImgBtn = document.querySelector(".save-img");

let brightness = 100 , saturation = 100 , inversion = 0 , grayscale = 0 ;

let rotate = 0 , flipVertical = 1 , flipHorizontal = 1; 

const applyFilters = () => {
	previewImg.style.transform = `rotate(${rotate}deg) scale(${flipVertical} , ${flipHorizontal})`;
	previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}

const loadImage = () => {
	let file = fileInput.files[0]; //getting user sleected image

	if(!file) return; //return if user has'nt selected file

	previewImg.src = URL.createObjectURL(file) //passing file url as preview img src

	previewImg.addEventListener("load" , () => {
		resetFiltersBtn.click();
		document.querySelector(".container").classList.remove("disable");
	})
}

filterOptions.forEach(option => {
	//adding clicklistener to all filter buttons
	option.addEventListener("click" , () => {
		document.querySelector(".filter .active").classList.remove("active");
		option.classList.add("active")
		filterName.innerText = option.innerText;

		if(option.id === "brightness"){
			filterSlider.max = "200";
			filterSlider.value = brightness;
			filterValue.innerText = `${brightness}%`
		} else if(option.id === "saturation"){
			filterSlider.max = "200";
			filterSlider.value = saturation;
			filterValue.innerText = `${saturation}%`
		}else if(option.id === "inversion"){
			filterSlider.max = "100";
			filterSlider.value = inversion;
			filterValue.innerText = `${inversion}%`
		}else{
			filterSlider.max = "100";
			filterSlider.value = grayscale;
			filterValue.innerText = `${grayscale}%`
		}
		
	})
})

const updateFilter = () => {
	filterValue.innerText = `${filterSlider.value}%`;
	const selectedFilter  = document.querySelector(".filter .active");

	if(selectedFilter.id === "brightness"){
		brightness = filterSlider.value;
	} else if(selectedFilter.id === "saturation"){
		saturation = filterSlider.value;
	}
	else if(selectedFilter.id === "inversion"){
		inversion = filterSlider.value;
	}
	else {
		grayscale = filterSlider.value;
	}
	applyFilters();
}

rotateOptions.forEach(option => {
	option.addEventListener("click" , () => {

		if(option.id === "left"){
			rotate -= 90;
		} else if(option.id === "right"){
			rotate += 90;
		}else if(option.id === "vertical"){
			flipVertical = flipVertical === 1 ? -1 : 1;
		} else {
			flipHorizontal = flipHorizontal === 1 ? -1 : 1;
		}

		applyFilters();
	})
})


const resetFilters = () => {
	brightness = 100 , saturation = 100 , inversion = 0 , grayscale = 0 ;

	rotate = 0 , flipVertical = 1 , flipHorizontal = 1; 

	filterOptions[0].click();
	applyFilters();
}

const saveImage = () => {
	const canvas  = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	canvas.width = previewImg.naturalWidth;
	canvas.height = previewImg.naturalHeight;

	ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
	ctx.translate(canvas.width / 2, canvas.height / 2 );
	
	if(rotate !== 0){
		ctx.rotate(rotate * Math.PI / 180);
	}
	ctx.scale(flipVertical , flipHorizontal);
	ctx.drawImage(previewImg , -canvas.width / 2, -canvas.height / 2 , canvas.width , canvas.height);


	const link = document.createElement("a");
	link.download = "image.jpg";
	link.href = canvas.toDataURL();
	link.click();
	//document.body.appendChild(canvas);
}
filterSlider.addEventListener("input" , updateFilter);
fileInput.addEventListener("change" , loadImage);
resetFiltersBtn.addEventListener("click" , resetFilters);
saveImgBtn.addEventListener("click" , saveImage)
chooseImgBtn.addEventListener("click" , () => fileInput.click())