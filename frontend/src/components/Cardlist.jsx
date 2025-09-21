import React, { useState, useEffect } from "react";
import delicon from "../assets/delicon.svg";
import backgone from "../assets/backgone.svg";
import Checkout from "../assets/checkout.svg";
import addicon from "../assets/addicon.svg";
import { useNavigate, useParams } from 'react-router-dom';
import { processPayment } from "../api/api";
import { deleteCard } from "../api/api";
import Swal from 'sweetalert2';


import { getAllCards } from "../api/api";

const Cardlist = () => {
  const navigate = useNavigate();
  const [selectedCardId, setSelectedCardId] = useState(null);
  const { userId, bookingId } = useParams();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      if (userId) {
        try {
          const userCards = await getAllCards(parseInt(userId, 10));
          setCards(userCards.data);
        } catch (error) {
          console.error("Error fetching cards:", error);
        }
      }
    };

    fetchCards();
  }, [userId]);

  const handleBack = () => {
    navigate(`/order-summary?user_id=${userId}&bid=${bookingId}`);
  };

  const handleCheckout = async () => {
    if (selectedCardId !== null) {
      try {
     
        const response = await processPayment(userId, selectedCardId, bookingId);
        if (!response.error) {
          navigate(`/Submission`);
        } else {
          alert("Error processing payment. Please try again.");
        }
      } catch (error) {
        console.error("Error processing payment:", error);
        alert("Error processing payment. Please try again.");
      }
    } else {
      alert("Please select a card to proceed to checkout.");
    }
  };


  const handleAddCard = () => {
    navigate(`/Cardpage/${userId}/${bookingId}/payout`);
    const newCard = {
      card_id: cards.length + 1,
      stripe_token: "new_token",
      last4: "0000",
      exp_month: "01",
      exp_year: "2026",
      cardholder_name: "New Cardholder",
      card_brand: "visa",
      customer_id: "new_customer_id",
      first_name: "New",
      last_name: "Card",
    };
    setCards([...cards, newCard]);
  };

  const handleDeleteCard = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const updatedCards = cards.filter((card) => card.card_id !== id);
        await deleteCard(id);
        setCards(updatedCards);

        if (selectedCardId === id) {
          setSelectedCardId(null);
        }

        Swal.fire(
          'Deleted!',
          'Your card has been deleted.',
          'success'
        );
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleCardClick = (id) => {
    setSelectedCardId(id);
  };

  return (
    <div className="min-h-screen white py-12 max-w-6xl mt-[-4rem] md:mt-[-7rem]  mx-auto">
      <div className="max-w-7xl  bg-white rounded-xl p-4 md:p-8">
        <h1 className="font-bold md:text-4xl text-2xl">TAXIGO</h1>
        <h5 className="md:text-2xl text-sm mt-2">Choose from the existing / Add new card</h5>

        {cards.map((card) => (
          <div
            key={card.card_id}
            onClick={() => handleCardClick(card.card_id)}
            className={`relative  md:p-4  md:w-full md:h-[120px] w-full rounded-lg md:mt-10 mt-5 cursor-pointer ${
              selectedCardId === card.card_id ? "bg-[#FFCA09]" : "bg-[#111D47]"
            }`}
          >
            <div className="flex justify-between px-2  ">
              <h1 className={`font-bold md:text-2xl text-lg my-2 md:mt-3 mt-4 ${
                selectedCardId === card.card_id ? "text-white" : "text-[#FE9901]"
              }`}>
                {card.first_name} {card.last_name}
              </h1>
              
              <img
                src={delicon}
                className="md:w-[28px] md:h-[30px] w-5 h-10 md:mt-5 mt-3 cursor-pointer"
                alt="Delete icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCard(card.card_id);
                }}
              />
            </div>
            <div className="flex justify-between px-2 pb-2">
              <p className={`text-bold md:text-xl text-sm  ${
                selectedCardId === card.card_id ? "text-white" : "text-[#FE9901]"
              }`}>
                {card.card_brand.toUpperCase()} ending in {card.last4}
              </p>
              <p className="text-white font-bold md:text-xl md:mt-1 mt-0 mb-1 text-sm">
                Exp: {card.exp_month}/{card.exp_year}
              </p>
            </div>
          </div>
        ))}

        <div className="flex justify-center items-center bg-[#FEB601] w-16 h-16 md:w-[60px] md:h-[60px]  rounded-full mx-auto mt-4">
          <button onClick={handleAddCard}>
            <img
              src={addicon}
              className="lg:h-24 lg:w-24 md:mt-4 mt-2"
              alt="Add icon"
            />
          </button>
        </div>

        <div className="md:flex md:flex-row  justify-around my-6">
          <button  onClick={handleBack}
           className="bg-[black] text-[#FEB601]  md:w-2/5 md:h-13 w-2/4 flex justify-center md:p-3 md:text-xl mx-auto p-1 md:mb-0 mb-3  text-sm font-bold rounded-lg">
            Back
            <img src={backgone} className="md:p-2  md:h-8 md:w-8 w-5 h-5 p-1 ml-1 " alt="Back icon" />
          </button>
          <button
            onClick={handleCheckout}
            className={`bg-[#FFCA09] text-[black] md:w-2/5 md:h-13 w-2/4 flex justify-center md:p-3 md:text-xl mx-auto p-1   text-sm font-bold rounded-lg ${
              selectedCardId === null ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={selectedCardId === null}
          >
            Checkout
            <img src={Checkout} className="md:p-2  md:h-8 md:w-8 w-5 h-5 p-1 ml-1" alt="Checkout icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cardlist;
