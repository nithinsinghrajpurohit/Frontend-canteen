const menuData = {
  rice: [
    { name: "Veg Rice", price: 70, type: "veg", image:"https://github.com/contactvihar-cpu/connect/blob/main/veg%20rice-70.jpg?raw=true" },
    { name: "Gobi Rice", price: 80, type: "veg" ,image:"https://github.com/contactvihar-cpu/connect/blob/main/gobi%20rice-80.jpg?raw=true"},
    { name: "Sweet Corn Rice", price: 80, type: "veg",image:"https://github.com/contactvihar-cpu/connect/blob/main/sweet-corn-rice-80.webp?raw=true" },
    { name: "Jeera Rice", price: 80, type: "veg",image:"https://github.com/contactvihar-cpu/connect/blob/main/Jeera-Rice-80.png?raw=true" },
    { name: "Baby Corn Rice", price: 90, type: "veg", image:"https://github.com/contactvihar-cpu/canteen/blob/main/Baby-Corn-Fried-Rice-90.jpg?raw=true" },
    { name: "Mushroom Rice", price: 100, type: "veg",image:" https://github.com/contactvihar-cpu/connect/blob/main/mushroom-rice-100.jpg?raw=true " },
    { name: "Ghee Rice", price: 100, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/Ghee_Rice_100.webp?raw=true" },
    { name: "Cashew Rice", price: 100, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/cashew-rice-100.webp?raw=true" },
    { name: "Paneer Rice", price: 100, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/Paneer-Fried-Rice-100.webp?raw=true" },
    { name: "Egg Rice", price: 70, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/egg%20rice-70.jpg?raw=true" },
    { name: "Chicken Rice", price: 110, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/chicken%20rice-110.jpg?raw=true" },
  ],

  noodles: [
    { name: "Veg Noodles", price: 70, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/veg%20noodles-70.jpg?raw=true" },
    { name: "Gobi Noodles", price: 80, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/gobi%20noodles-80.jpg?raw=true" },
    { name: "Sweet Corn Noodles", price: 80, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/sweet%20corn%20noodles-80.png?raw=true" },
    { name: "Baby Corn Noodles", price: 90, type: "veg",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ItqDyFuqUcrzyeUuBpXjxax1wJHQQJLMeA&s" },
    { name: "Mushroom Noodles", price: 100, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/mushroom%20noodles-100.webp?raw=true" },
    { name: "Paneer Noodles", price: 100, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/paneer%20noodles-100.jpg?raw=true" },
    { name: "Egg Noodles", price: 70, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/egg%20noodles-70.jpg?raw=true" },
    { name: "Chicken Noodles", price: 110, type: "nonveg",image:"https://static.toiimg.com/thumb/54458787.cms?imgsize=153197&width=800&height=800" },
  ],

  biryani: [
    { name: "Chicken Biryani", price: 150, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/chicken%20biriyani-150.jpg?raw=true" },
    { name: "Lollipop Biryani (3 pcs)", price: 160, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/chicken%20lollipop%20biriyani(pieces-3)-160.jpg?raw=true" },
    { name: "Leg Piece Biryani (2 pcs)", price: 190, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/leg%20piece%20biriyani(2-piece)-190.jpg?raw=true" },
    { name: "Boneless Biryani", price: 190, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/Boneless-Chicken-Biryani-190.jpg?raw=true" },
    { name: "Mini Biryani", price: 110, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/mini%20biriyani-110.jpg?raw=true" },
    { name: "Egg Biryani", price: 120, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/-Egg-Biryani-120.jpg?raw=true" },
    { name: "Dry Lollipops (3 pcs)", price: 100, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/dry%20lollipop%203-pieces-100.jpg?raw=true" },
    { name: "Veg Biryani", price: 120, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/veg%20biriyani-120.jpg?raw=true" },
  ],

  specialRice: [
    { name: "Special Gobi Rice", price: 120, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/special-gobi-rice-120.webp?raw=true" },
    { name: "Special Mushroom Rice", price: 130, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/special%20mushroom-fried-rice-130.webp?raw=true" },
    { name: "Special Paneer Rice", price: 130, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/special%20paneer-fried-rice-130.jpg?raw=true"},
    { name: "Special Egg Rice", price: 120, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/special%20egg-fried-rice-120.jpg?raw=true" },
    { name: "Special Chicken Rice", price: 180, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/special%20chicken%20rice-180.jpg?raw=true" },
    { name: "Triple Fried Rice Veg", price: 150, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/triple%20fried%20rice%20veg-150.jpg?raw=true" },
    { name: "Triple Fried Chicken Rice", price: 190, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/triple%20fried%20chicken%20rice-190.jpg?raw=true" },
    { name: "Schezwan Gobi Rice", price: 100, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/schezwaan%20Gobi-Fried-Rice-100.jpg?raw=true" },
    { name: "Schezwan Egg Rice", price: 90, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/schezwaan%20egg%20rice.webp?raw=true"},
    { name: "Schezwan Chicken Rice", price: 130, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/schezwaan%20chicken%20rice-130.jpg?raw=true"},
    { name: "Schezwan Chicken Noodles", price: 130, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/schezwaan%20chicken%20noodles-130.jpg?raw=true" },
  ],

  tiffins: [
    { name: "Dosa", price: 20, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/dosa-20.jpg?raw=true" },
    { name: "Uthappam", price: 30, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/utham-30.jpg?raw=true" },
    { name: "Karam Dosa", price: 30, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/karam-dosa-30.jpg?raw=true" },
    { name: "Masala Dosa", price: 40, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/masala%20dosa-40.jpg?raw=true" },
    { name: "Onion Dosa", price: 40, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/onion%20dosa-40.jpg?raw=true" },
    { name: "Ghee Dosa", price: 50, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/ghee%20dosa-50.jpg?raw=true"},
    { name: "Egg Dosa", price: 50, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/egg%20dosa-50.webp?raw=true" },
    { name: "Poori", price: 30, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/poori-30.webp?raw=true" },
  ],

  curries: [
    { name: "Veg Curry", price: 100, type: "veg",image: "https://github.com/contactvihar-cpu/canteen/blob/main/veg%20curry-100.jpg?raw=true" },
    { name: "Egg Curry", price: 60, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/Egg-Curry-60.jpg?raw=true" },
    { name: "Mushroom Curry", price: 130, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/mushroom%20curry-130.JPG?raw=true" },
    { name: "Paneer Curry", price: 140, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/Paneer-Curry-140.jpg?raw=true" },
    { name: "Chicken Curry (Full)", price: 150, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/chicken%20curry%20full-150.jpg?raw=true"},
    { name: "Chicken Curry (Half)", price: 100, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/Chicken-Curry-half-100.webp?raw=true" },
    { name: "Dal Rice", price: 70, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/dal%20rice-70.jpg?raw=true" },
    { name: "Tomato Rice", price: 70, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/Tomato-Rice-70.webp?raw=true" },
    { name: "Lemon Rice", price: 60, type: "veg",image:"https://www.indianveggiedelight.com/wp-content/uploads/2023/03/lemon-rice-stovetop-featured.jpg" },
    { name: "Curd Rice", price: 60, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/curd%20rice-60.jpg?raw=true" },
  ],

  starters: [
    { name: "Gobi Manchurian", price: 110, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/gobi%20manjuria-110.webp?raw=true" },
    { name: "Chilli Gobi", price: 120, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/chilli%20gobi-120.jpg?raw=true" },
    { name: "Gobi 65", price: 120, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/gobi-65-120.webp?raw=true" },
    { name: "Aloo Gobi", price: 110, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/aloo%20gobi-110.jpg?raw=true" },
    { name: "Mushroom Manchurian", price: 150, type: "veg",image:"https://images.archanaskitchen.com/images/recipes/world-recipes/indian-chinese-recipes/Mushroom_Manchurian_Recipe_Dry_Indo_Chinese_Indian_Chinese_10_a0e1d8f782.jpg" },
    { name: "Paneer Manchurian", price: 150, type: "veg" ,image:"https://github.com/contactvihar-cpu/canteen/blob/main/paneer-manchurian-150.jpg?raw=true"},
    { name: "Paneer Chilli", price: 160, type: "veg",image:"https://signatureconcoctions.com/wp-content/uploads/2023/11/pasted-image-0-7.png" },
    { name: "Egg Chilli", price: 140, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/egg%20chilli-140.jpg?raw=true" },
    { name: "Chicken Manchurian", price: 180, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/chicken%20manchurian-180.jpg?raw=true" },
    { name: "Chicken 65", price: 190, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/chicken-65-190.jpg?raw=true" },
    { name: "Chilli Chicken", price: 190, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/CHILLICHICKEN_190.webp?raw=true" },
  ],

  snacks: [
    { name: "Samosa", price: 20, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/samosa-20.jpg?raw=true" },
    { name: "Bread Patties", price: 25, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/bread%20patties-25.jpg?raw=true" },
    { name: "Bread Omelette", price: 50, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/bread-omelette-50.webp?raw=true" },
    { name: "Pani Puri", price: 30, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/pani%20puri-30.jpg?raw=true" },
    { name: "Samosa Chat", price: 50, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/samosa%20chat-50.jpg?raw=true" },
    { name: "Gobi Chat", price: 50, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/gobi%20chat-50.jpg?raw=true" },
    { name: "Gulab Jamun", price: 15, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/gulab%20jamun-15.jpg?raw=true" },
    { name: "Parota", price: 50, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/parotta-50.webp?raw=true" },
    { name: "Egg Parota", price: 50, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/egg%20parota-50.jpg?raw=true" },
    { name: "Chapati", price: 50, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/chapathi-50.jpg?raw=true" },
  ],

  rolls: [
    { name: "Veg Roll", price: 60, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/veg%20roll-60.jpg?raw=true" },
    { name: "Gobi Roll", price: 70, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/gobi%20roll-70.jpg?raw=true" },
    { name: "Paneer Roll", price: 80, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/paneer%20roll-80.jpg?raw=true" },
    { name: "Egg Roll", price: 60, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/egg%20roll-60.webp?raw=true" },
    { name: "Chicken Roll", price: 80, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/chicken%20roll-80.jpg?raw=true" },
    { name: "Special Gobi Roll", price: 90, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/special%20gobi%20roll-90.webp?raw=true" },
    { name: "Special Egg Roll", price: 80, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/special%20egg%20roll-90.webp?raw=true" },
    { name: "Special Chicken Roll", price: 100, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/special%20chicken%20roll-100.jpg?raw=true" },
    { name: "Bread Omelette", price: 50, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/bred%20omlette-50.webp?raw=true" },
    { name: "Omelette", price: 40, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/omlette-40.jpg?raw=true" },
  ],

  sandwiches: [
    { name: "Veg Sandwich", price: 50, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/veg%20sandwich-50.jpg?raw=true" },
    { name: "Egg Sandwich", price: 60, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/egg%20sandwich-60.jpg?raw=true" },
    { name: "Chicken Sandwich", price: 80, type: "nonveg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/chicken%20sandwich-80.jpg?raw=true" },
    { name: "Garlic Sandwich", price: 60, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/garlic%20sandwich-60.jpg?raw=true" },
  ],

  meals: [
    { name: "Mini Meals", price: 60, type: "veg",image:"https://thehomecookings.com/wp-content/uploads/2025/03/veg-mini.jpeg" },
    { name: "Meals", price: 90, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/meals-90.jpg?raw=true" },
    { name: "Executive Meals", price: 120, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/executive%20meals-120.webp?raw=true" },
    { name: "Meals Parcel", price: 150, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/meals%20parsel-150.jpg?raw=true" },
  ],

  beverages: [
    { name: "Tea", price: 13, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/tea-13.webp?raw=true" },
    { name: "Coffee", price: 15, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/coffee-15.jpg?raw=true" },
    { name: "Green Tea", price: 20, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/green%20tea-20.jpg?raw=true" },
    { name: "Lemon Tea", price: 20, type: "veg",image:"https://images.ctfassets.net/v601h1fyjgba/vLTpiu7GXnZotw9x7azqb/4c638af4f2df11f572d92bfe2c46e2cc/LS_IMG_IST_Chamomile_Tea_Lemon_Hi.jpg" },
    { name: "Milk", price: 15, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/milk-15.jpg?raw=true" },
  ],

  fruitJuices: [
    { name: "Watermelon", price: 30, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/watermelon%20fruit%20juice-30.webp?raw=true" },
    { name: "Mosambi", price: 30, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/mosambi%20fruit%20juice-30.jpg?raw=true" },
    { name: "Orange", price: 40, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/orange%20fruit%20juice-40.jpeg?raw=true" },
  ],

  shakes: [
    { name: "Banana", price: 40, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/banana%20shake-40.png?raw=true" },
    { name: "Mango", price: 40, type: "veg",image:"https://github.com/contactvihar-cpu/canteen/blob/main/mango%20shake-40.jpg?raw=true" },
  ],
};

export default menuData;