import * as d3 from 'd3'

var margin = {top: 50, right: 50, bottom: 50, left: 50},
  width = 750 - margin.left - margin.right,
  height = 445 - margin.top - margin.bottom;

var svg = d3.select("#lost_items")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

        var y_scale = d3
        .scaleLinear()
        .domain([0, 70000])
        .range([height, 0])
    
      var x_scale = d3
        .scaleBand()
        .domain([
          'MTA Metrocard',
          'Cell phone',
          'Wallet',
          'Debit Card',
          'Cash',
          'Misc Items',
          'Credit Card',
          'Drivers License',
          'School ID',
          'Shopping bag'
        ])
        .range([0, width])
    
      var y_axis = d3.axisLeft(y_scale)
      svg
        .append('g')
        .attr('class', 'axis y-axis')
        .call(y_axis)
    
      var x_axis = d3.axisBottom(x_scale)
      svg
        .append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(x_axis)
      
    
      // Ready function
    
      // d3.csv('eating-data.csv')
      //   .then(ready)
      //   .catch(function(err) {
      //     console.log('Failed with', err)
      //   })


        var datapoints =[
          {
            "SubCategory": [
               {
                  "_SubCategory": "Wall and Window Covering",
                  "_count": "98"
               },
               {
                  "_SubCategory": "Ornaments",
                  "_count": "62"
               },
               {
                  "_SubCategory": "Appliances",
                  "_count": "163"
               },
               {
                  "_SubCategory": "Linen",
                  "_count": "1511"
               },
               {
                  "_SubCategory": "Floor Covering",
                  "_count": "43"
               },
               {
                  "_SubCategory": "All Other Furnishings",
                  "_count": "652"
               },
               {
                  "_SubCategory": "Dishware",
                  "_count": "767"
               }
            ],
            "_Category": "Home Furnishings"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Bats",
                  "_count": "15"
               },
               {
                  "_SubCategory": "Scooter",
                  "_count": "97"
               },
               {
                  "_SubCategory": "Golf Club",
                  "_count": "6"
               },
               {
                  "_SubCategory": "Ball",
                  "_count": "316"
               },
               {
                  "_SubCategory": "Skateboard",
                  "_count": "79"
               },
               {
                  "_SubCategory": "Binocular",
                  "_count": "26"
               },
               {
                  "_SubCategory": "Electric Motor Scooter",
                  "_count": "2"
               },
               {
                  "_SubCategory": "Protective Gear",
                  "_count": "486"
               },
               {
                  "_SubCategory": "Hockey Stick",
                  "_count": "10"
               },
               {
                  "_SubCategory": "Sports Racket",
                  "_count": "148"
               },
               {
                  "_SubCategory": "Bicycle",
                  "_count": "229"
               },
               {
                  "_SubCategory": "Skis",
                  "_count": "3"
               },
               {
                  "_SubCategory": "All Other sports equipment",
                  "_count": "596"
               }
            ],
            "_Category": "Sports Equipment"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Insulin Pump",
                  "_count": "91"
               },
               {
                  "_SubCategory": "Medication",
                  "_count": "6129"
               },
               {
                  "_SubCategory": "X - Rays",
                  "_count": "102"
               },
               {
                  "_SubCategory": "Other",
                  "_count": "524"
               },
               {
                  "_SubCategory": "Walker",
                  "_count": "15"
               },
               {
                  "_SubCategory": "Wheel Chair",
                  "_count": "19"
               },
               {
                  "_SubCategory": "Blood Pressure Meter",
                  "_count": "65"
               },
               {
                  "_SubCategory": "All Other Medical Equipment / Supplies",
                  "_count": "946"
               },
               {
                  "_SubCategory": "Electric wheelchair/scooter",
                  "_count": "3"
               },
               {
                  "_SubCategory": "Cane",
                  "_count": "668"
               },
               {
                  "_SubCategory": "Diabetic Testing Equipment",
                  "_count": "140"
               },
               {
                  "_SubCategory": "Glucose Meter",
                  "_count": "334"
               }
            ],
            "_Category": "Medical Equipment & Medication"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Tools",
                  "_count": "1407"
               },
               {
                  "_SubCategory": "Tool Box",
                  "_count": "82"
               },
               {
                  "_SubCategory": "Tool Belt",
                  "_count": "29"
               }
            ],
            "_Category": "Tools"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Car",
                  "_count": "2524"
               },
               {
                  "_SubCategory": "House",
                  "_count": "13296"
               },
               {
                  "_SubCategory": "Electronic key card",
                  "_count": "653"
               },
               {
                  "_SubCategory": "All Other keys",
                  "_count": "3824"
               }
            ],
            "_Category": "Keys"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Transit Check",
                  "_count": "195"
               },
               {
                  "_SubCategory": "All Other Tickets",
                  "_count": "604"
               },
               {
                  "_SubCategory": "NJ Transit",
                  "_count": "462"
               },
               {
                  "_SubCategory": "Metro North Tickets",
                  "_count": "256"
               },
               {
                  "_SubCategory": "Lottery Tickets",
                  "_count": "791"
               },
               {
                  "_SubCategory": "Entertainment Tickets",
                  "_count": "142"
               },
               {
                  "_SubCategory": "MTA Metrocard",
                  "_count": "55151"
               },
               {
                  "_SubCategory": "LIRR Tickets",
                  "_count": "413"
               },
               {
                  "_SubCategory": "Airline",
                  "_count": "123"
               }
            ],
            "_Category": "Tickets"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Photo album",
                  "_count": "46"
               },
               {
                  "_SubCategory": "Paperback",
                  "_count": "7035"
               },
               {
                  "_SubCategory": "Address book",
                  "_count": "854"
               },
               {
                  "_SubCategory": "Soft cover",
                  "_count": "3925"
               },
               {
                  "_SubCategory": "Other",
                  "_count": "954"
               },
               {
                  "_SubCategory": "Diary",
                  "_count": "687"
               },
               {
                  "_SubCategory": "Hard Cover",
                  "_count": "3792"
               }
            ],
            "_Category": "Book"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Vest",
                  "_count": "19"
               },
               {
                  "_SubCategory": "Badge",
                  "_count": "63"
               },
               {
                  "_SubCategory": "Radio",
                  "_count": "8"
               },
               {
                  "_SubCategory": "Pass or Badge holder",
                  "_count": "17"
               },
               {
                  "_SubCategory": "All other NYCT Equiment",
                  "_count": "64"
               },
               {
                  "_SubCategory": "Epic pass",
                  "_count": "426"
               }
            ],
            "_Category": "NYCT Equipment"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Gift Card ",
                  "_count": "3658"
               },
               {
                  "_SubCategory": "Payroll check",
                  "_count": "1177"
               },
               {
                  "_SubCategory": "Money Order",
                  "_count": "229"
               },
               {
                  "_SubCategory": "Personal Check",
                  "_count": "1707"
               },
               {
                  "_SubCategory": "Travelers Checks ",
                  "_count": "21"
               },
               {
                  "_SubCategory": "Other Currency",
                  "_count": "207"
               },
               {
                  "_SubCategory": "Cash",
                  "_count": "44772"
               },
               {
                  "_SubCategory": "Foreign Currency",
                  "_count": "2805"
               }
            ],
            "_Category": "Currency"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Flute",
                  "_count": "111"
               },
               {
                  "_SubCategory": "Musical instrument accessories",
                  "_count": "84"
               },
               {
                  "_SubCategory": "Clarinet",
                  "_count": "98"
               },
               {
                  "_SubCategory": "All Other Instruments",
                  "_count": "142"
               },
               {
                  "_SubCategory": "Guitar",
                  "_count": "60"
               },
               {
                  "_SubCategory": "Violin",
                  "_count": "114"
               },
               {
                  "_SubCategory": "Harmonica",
                  "_count": "9"
               },
               {
                  "_SubCategory": "Saxophone",
                  "_count": "41"
               },
               {
                  "_SubCategory": "Trumpet",
                  "_count": "96"
               }
            ],
            "_Category": "Musical Instrument"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Fashion (Costume)",
                  "_count": "3687"
               },
               {
                  "_SubCategory": "Cuff Links",
                  "_count": "10"
               },
               {
                  "_SubCategory": "Necklace",
                  "_count": "525"
               },
               {
                  "_SubCategory": "Watch",
                  "_count": "1941"
               },
               {
                  "_SubCategory": "Ring",
                  "_count": "1306"
               },
               {
                  "_SubCategory": "Bracelet",
                  "_count": "834"
               },
               {
                  "_SubCategory": "Earrings",
                  "_count": "453"
               },
               {
                  "_SubCategory": "All other Jewelry",
                  "_count": "185"
               },
               {
                  "_SubCategory": "Tie Clips",
                  "_count": "2"
               }
            ],
            "_Category": "Jewelry"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Digital Camera",
                  "_count": "978"
               },
               {
                  "_SubCategory": "USB Drive",
                  "_count": "698"
               },
               {
                  "_SubCategory": "Portable radio",
                  "_count": "343"
               },
               {
                  "_SubCategory": "Computer ",
                  "_count": "1275"
               },
               {
                  "_SubCategory": "GPS Navigation System",
                  "_count": "48"
               },
               {
                  "_SubCategory": "CD Player",
                  "_count": "158"
               },
               {
                  "_SubCategory": "Electronic accessories",
                  "_count": "997"
               },
               {
                  "_SubCategory": "All other Electronics",
                  "_count": "2342"
               },
               {
                  "_SubCategory": "Digital media/MP3/4 Player",
                  "_count": "2255"
               },
               {
                  "_SubCategory": "Record Player",
                  "_count": "34"
               },
               {
                  "_SubCategory": "Photo/Video Equipment",
                  "_count": "344"
               },
               {
                  "_SubCategory": "Television set",
                  "_count": "10"
               },
               {
                  "_SubCategory": "Body Activity Tracker",
                  "_count": "96"
               },
               {
                  "_SubCategory": "Earphones Speakers",
                  "_count": "1058"
               },
               {
                  "_SubCategory": "Computer External Hard Drive",
                  "_count": "49"
               },
               {
                  "_SubCategory": "Camera Accessories",
                  "_count": "362"
               },
               {
                  "_SubCategory": "Clock",
                  "_count": "20"
               },
               {
                  "_SubCategory": "Walkman",
                  "_count": "86"
               },
               {
                  "_SubCategory": "DVD Player",
                  "_count": "146"
               },
               {
                  "_SubCategory": "Camera",
                  "_count": "308"
               },
               {
                  "_SubCategory": "Calculator",
                  "_count": "583"
               },
               {
                  "_SubCategory": "Air conditioner",
                  "_count": "2"
               },
               {
                  "_SubCategory": "Translator",
                  "_count": "32"
               },
               {
                  "_SubCategory": "Computer Accessories",
                  "_count": "453"
               },
               {
                  "_SubCategory": "PDA",
                  "_count": "18"
               },
               {
                  "_SubCategory": "Electronic Tablet",
                  "_count": "1341"
               },
               {
                  "_SubCategory": "Electronic Reading Device",
                  "_count": "838"
               }
            ],
            "_Category": "Electronics"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Suitcase",
                  "_count": "619"
               },
               {
                  "_SubCategory": "Handbag",
                  "_count": "4369"
               },
               {
                  "_SubCategory": "Shoulder bag",
                  "_count": "4333"
               },
               {
                  "_SubCategory": "Briefcase",
                  "_count": "746"
               },
               {
                  "_SubCategory": "Shopping bag",
                  "_count": "19290"
               },
               {
                  "_SubCategory": "Tote bag",
                  "_count": "8006"
               },
               {
                  "_SubCategory": "Garment/suit bag",
                  "_count": "186"
               },
               {
                  "_SubCategory": "Duffle bag",
                  "_count": "1583"
               },
               {
                  "_SubCategory": "Backpack",
                  "_count": "17018"
               },
               {
                  "_SubCategory": "All other baggage",
                  "_count": "7126"
               },
               {
                  "_SubCategory": "Messenger bag",
                  "_count": "278"
               }
            ],
            "_Category": "Carry Bag / Luggage"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Eyeglass case without glasses",
                  "_count": "540"
               },
               {
                  "_SubCategory": "Eye glasses",
                  "_count": "9784"
               },
               {
                  "_SubCategory": "Other",
                  "_count": "338"
               },
               {
                  "_SubCategory": "Sunglasses",
                  "_count": "3600"
               }
            ],
            "_Category": "Eye Wear"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Pouch",
                  "_count": "3940"
               },
               {
                  "_SubCategory": "Wristlet",
                  "_count": "2357"
               },
               {
                  "_SubCategory": "Purse",
                  "_count": "11978"
               },
               {
                  "_SubCategory": "ID Holder",
                  "_count": "9732"
               },
               {
                  "_SubCategory": "Business Card holder",
                  "_count": "587"
               },
               {
                  "_SubCategory": "Billfold",
                  "_count": "251"
               },
               {
                  "_SubCategory": "Handbag",
                  "_count": "675"
               },
               {
                  "_SubCategory": "Lanyard",
                  "_count": "60"
               },
               {
                  "_SubCategory": "All Other Wallet / Purse",
                  "_count": "1449"
               },
               {
                  "_SubCategory": "Fanny pack",
                  "_count": "244"
               },
               {
                  "_SubCategory": "Wallet",
                  "_count": "49498"
               }
            ],
            "_Category": "Wallet/Purse"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Scarf",
                  "_count": "2596"
               },
               {
                  "_SubCategory": "All Other Accessories",
                  "_count": "1441"
               },
               {
                  "_SubCategory": "Hat",
                  "_count": "5078"
               },
               {
                  "_SubCategory": "Gloves",
                  "_count": "4303"
               },
               {
                  "_SubCategory": "Make-up",
                  "_count": "2326"
               },
               {
                  "_SubCategory": "Ties",
                  "_count": "370"
               },
               {
                  "_SubCategory": "Belt",
                  "_count": "402"
               },
               {
                  "_SubCategory": "Umbrella",
                  "_count": "3717"
               }
            ],
            "_Category": "Accessories"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Jacket",
                  "_count": "4143"
               },
               {
                  "_SubCategory": "Coat ",
                  "_count": "695"
               },
               {
                  "_SubCategory": "Nightwear",
                  "_count": "204"
               },
               {
                  "_SubCategory": "Skirt",
                  "_count": "592"
               },
               {
                  "_SubCategory": "Blouse",
                  "_count": "1029"
               },
               {
                  "_SubCategory": "Sweater",
                  "_count": "3311"
               },
               {
                  "_SubCategory": "Pants/trousers/shorts",
                  "_count": "7584"
               },
               {
                  "_SubCategory": "Suit",
                  "_count": "104"
               },
               {
                  "_SubCategory": "Shirt",
                  "_count": "5008"
               },
               {
                  "_SubCategory": "Under garment",
                  "_count": "3296"
               },
               {
                  "_SubCategory": "All Other Clothing",
                  "_count": "4774"
               },
               {
                  "_SubCategory": "T-shirt",
                  "_count": "4203"
               },
               {
                  "_SubCategory": "Dress",
                  "_count": "847"
               },
               {
                  "_SubCategory": "Leather Jacket",
                  "_count": "89"
               }
            ],
            "_Category": "Clothing "
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Lunch box",
                  "_count": "1677"
               },
               {
                  "_SubCategory": "Blue print",
                  "_count": "30"
               },
               {
                  "_SubCategory": "Photo/Pictures",
                  "_count": "1206"
               },
               {
                  "_SubCategory": "Baby stroller/Carrier",
                  "_count": "166"
               },
               {
                  "_SubCategory": "Portfolio",
                  "_count": "838"
               },
               {
                  "_SubCategory": "All Other Misc Items ",
                  "_count": "33471"
               },
               {
                  "_SubCategory": "Art and Crafts",
                  "_count": "706"
               },
               {
                  "_SubCategory": "Mail",
                  "_count": "3037"
               },
               {
                  "_SubCategory": "Checkbook",
                  "_count": "1019"
               },
               {
                  "_SubCategory": "Tefillin/Phylacteries (Jewish)",
                  "_count": "21"
               },
               {
                  "_SubCategory": "Folder",
                  "_count": "5709"
               },
               {
                  "_SubCategory": "Envelope",
                  "_count": "3426"
               },
               {
                  "_SubCategory": "Stationary Supplies",
                  "_count": "4812"
               }
            ],
            "_Category": "Miscellaneous"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Walkie Talkie",
                  "_count": "168"
               },
               {
                  "_SubCategory": "Answering Machine",
                  "_count": "9"
               },
               {
                  "_SubCategory": "Other",
                  "_count": "76"
               },
               {
                  "_SubCategory": "Cell phone ",
                  "_count": "50891"
               },
               {
                  "_SubCategory": "Pager",
                  "_count": "83"
               },
               {
                  "_SubCategory": "Telephone Accessories",
                  "_count": "5390"
               }
            ],
            "_Category": "Cell Phone/Telephone/Communication Device"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Baby Toys",
                  "_count": "186"
               },
               {
                  "_SubCategory": "All Other Toys",
                  "_count": "815"
               },
               {
                  "_SubCategory": "Board Game",
                  "_count": "105"
               },
               {
                  "_SubCategory": "Doll",
                  "_count": "236"
               },
               {
                  "_SubCategory": "Cars/Trucks",
                  "_count": "251"
               },
               {
                  "_SubCategory": "Stuffed Animals",
                  "_count": "360"
               }
            ],
            "_Category": "Toys"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Debit Card",
                  "_count": "46299"
               },
               {
                  "_SubCategory": "Badge",
                  "_count": "242"
               },
               {
                  "_SubCategory": "Passport",
                  "_count": "3432"
               },
               {
                  "_SubCategory": "Social Security Card",
                  "_count": "8253"
               },
               {
                  "_SubCategory": "Birth Certificate",
                  "_count": "1358"
               },
               {
                  "_SubCategory": "School ID",
                  "_count": "19347"
               },
               {
                  "_SubCategory": "Credit Card",
                  "_count": "25014"
               },
               {
                  "_SubCategory": "AAA Card",
                  "_count": "796"
               },
               {
                  "_SubCategory": "Resident Card",
                  "_count": "1210"
               },
               {
                  "_SubCategory": "Employment ID",
                  "_count": "9139"
               },
               {
                  "_SubCategory": "Identification Card",
                  "_count": "18069"
               },
               {
                  "_SubCategory": "Library card",
                  "_count": "7086"
               },
               {
                  "_SubCategory": "All Other Personal Identification",
                  "_count": "11766"
               },
               {
                  "_SubCategory": "Membership card",
                  "_count": "11964"
               },
               {
                  "_SubCategory": "Military ID",
                  "_count": "303"
               },
               {
                  "_SubCategory": "Drivers License",
                  "_count": "21561"
               },
               {
                  "_SubCategory": "Registration Card",
                  "_count": "440"
               },
               {
                  "_SubCategory": "Benefit Card",
                  "_count": "13782"
               },
               {
                  "_SubCategory": "Insurance Card",
                  "_count": "19030"
               },
               {
                  "_SubCategory": "Death Certificate",
                  "_count": "27"
               }
            ],
            "_Category": "Identification"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Video Games System",
                  "_count": "488"
               },
               {
                  "_SubCategory": "All Other Entertainment",
                  "_count": "334"
               },
               {
                  "_SubCategory": "VHS Tape",
                  "_count": "119"
               },
               {
                  "_SubCategory": "DVD",
                  "_count": "1198"
               },
               {
                  "_SubCategory": "Blu-Ray",
                  "_count": "7"
               },
               {
                  "_SubCategory": "Computer Games ",
                  "_count": "388"
               },
               {
                  "_SubCategory": "Compact Disc",
                  "_count": "985"
               }
            ],
            "_Category": "Entertainment (Music/Movies/Games)"
         },
         {
            "SubCategory": [
               {
                  "_SubCategory": "Shoes",
                  "_count": "2819"
               },
               {
                  "_SubCategory": "Boots",
                  "_count": "986"
               },
               {
                  "_SubCategory": "Slippers",
                  "_count": "723"
               },
               {
                  "_SubCategory": "Sandals",
                  "_count": "577"
               },
               {
                  "_SubCategory": "Galoshes",
                  "_count": "37"
               },
               {
                  "_SubCategory": "All Other Footwear",
                  "_count": "181"
               },
               {
                  "_SubCategory": "Sneakers",
                  "_count": "2940"
               }
            ],
            "_Category": "Footwear"
         }
      ]


      
        function top10(datapoints){  //sorting to top 10 function
          datapoints.sort(function(a, b) {
                           return parseFloat(b['Base Salary']) - parseFloat(a['Base Salary']);
                         });
          return datapoints.slice(0, 10); 
        }
      
        data = top10(datapoints);
    
      //function ready(datapoints) {
          
        // Add and style your marks here
        svg
          .selectAll('rect')
          .data(data)
          .enter()
          .append('rect')
          .attr('fill', pink)
          .attr('x', function(d) {
            return x_scale(d._SubCategory)
          })
          .attr('y', function(d) {
            return y_scale(d._count)
          })
          .attr('height', function(d) {
            return height - y_scale(d._count)
          })
          .attr('width', x_scale.bandwidth())
      
    