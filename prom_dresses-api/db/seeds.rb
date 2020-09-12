# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Dress.create ([
#     {name:'ELLIE FORMAL SATIN HIGH SLIT DRESS',
#     silhouette:('empire waist'' fit and flare'),
#     neckline: 'v nec',
#     length:'long',
#     color:'mauve',
#     img_url:'https://cdn.shopify.com/s/files/1/0070/8853/7651/products/05002-0138_1_1194x.jpg?v=1572403438',
#     price:109.90,
#     dress_id:1
#     }, 
# ])
Rating.create ([
    {comment:'I love this dress',
    star_rating:5, 
    dress_id:1,
    username: "tester"
    }
])