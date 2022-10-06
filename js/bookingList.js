
        const bookingCardTemplate = document.querySelector("[data-booking-template]")
        const bookingCardContainer = document.querySelector("[data-booking-cards-container]")
        const searchInput = document.querySelector("[data-search]")

        let bookings = []

        searchInput.addEventListener("input", e => {
        const value = e.target.value.toLowerCase()
        bookings.forEach(booking => {
            const isVisible =
            booking.customername.toLowerCase().includes(value) ||
            booking.phonenumber.includes(value) ||
            booking.date.includes(value) ||
            booking.timeslot.includes(value) ||
            booking.cinemaname.toLowerCase().includes(value) ||
            booking.moviename.toLowerCase().includes(value) ||
            booking.totalprice.toLowerCase().includes(value)
            booking.element.classList.toggle("hide", !isVisible)
        })
        })

        fetch("/json/bookings.json")
        .then(res => res.json())
        .then(data => {
            bookings = data.map(booking => {
            const card = bookingCardTemplate.content.cloneNode(true).children[0]
            const customername = card.querySelector("[data-customerName]")
            const phonenumber = card.querySelector("[data-phonenumber]")
            const date = card.querySelector("[data-date]")
            const timeslot = card.querySelector("[data-timeslot]")
            const cinemaname = card.querySelector("[data-cinemaname]")
            const moviename = card.querySelector("[data-moviename]")
            const totalprice = card.querySelector("[data-totalprice]")
            customername.textContent = booking.customerName, phonenumber.textContent = booking.phoneNumber,date.textContent = booking.date,
            timeslot.textContent = booking.timeSlot,cinemaname.textContent = booking.cinemaName,
            moviename.textContent = booking.movieName,totalprice.textContent = booking.totalPrice
            bookingCardContainer.append(card)
            return { 
                customername: booking.customerName, phonenumber: booking.phoneNumber, date: booking.date, timeslot: booking.timeSlot,
                cinemaname: booking.cinemaName,moviename: booking.movieName,totalprice: booking.totalPrice, 
                element: card }
            })
        })