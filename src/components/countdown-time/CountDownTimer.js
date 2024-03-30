import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2';

const CountdownTimer = ({ start_time, end_time, email, ayselAmount, detail, uuid, game_name, product_name, product_price, buy_method, product_id }) => {
  const [day, setDay] = useState('');
  const [hour, seHour] = useState('');
  const [minute, setMinute] = useState('');
  const [second, setSecond] = useState('');

  useEffect(() => {
    const targetDateTime = new Date(end_time);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDateTime - now;
      const datetimeString = start_time;
      const dateTime = new Date(datetimeString);
      const formattedDateTime = dateTime.getTime();

      const count = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
      const finish = `${targetDateTime.getFullYear()}-${targetDateTime.getMonth() + 1}-${targetDateTime.getDate()} ${targetDateTime.getHours()}:${targetDateTime.getMinutes()}:${targetDateTime.getSeconds()}`

      if (now <= formattedDateTime) {

      } else {
        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setDay(days)
          seHour(hours)
          setMinute(minutes)
          setSecond(seconds)
        }
        if (count === finish) {
          axios.patch(`${process.env.REACT_APP_API}/update-auction-status/${uuid}`, {
            auction_status: 1
          })
            .then((response) => {
              if (response.data.status) {
                Swal.fire({
                  title: 'สำเร็จ',
                  text: response.data.payload,
                  icon: 'success'
                });
              } else {
                Swal.fire({
                  title: 'ผิดพลาด',
                  text: response.data.payload,
                  icon: 'error'
                });
              }
            })
            .catch((error) => {
              Swal.fire({
                title: 'ผิดพลาด',
                text: 'แก้ไขสถานะล้มเหลว',
                icon: 'error'
              });
            })
          axios.patch(`${process.env.REACT_APP_API}/update-aysel`, {
            email: email,
            aysel_amount: ayselAmount
          }, {
            withCredentials: true
          })
            .then((response) => {
              if (response.data.status) {
                // console.log("Update Aysel finish")
              } else {
                // console.log("Warning")
              }
            })
            .catch((error) => {
              console.log(error)
            })
          axios.post(`${process.env.REACT_APP_API}/create-store-product`, {
            email: email,
            method_uuid: product_id,
            game_name: game_name,
            product_name: product_name,
            used_status: 0
          }, { withCredentials: true })
            .then((response) => {
              if (response.data.status) {
                // console.log("สร้างสินค้าในคลังสำเร็จ")
                axios.get(`${process.env.REACT_APP_API}/read-lasted-store-product`, { withCredentials: true })
                  .then((response) => {
                    if (response.data.status) {
                      axios.post(`${process.env.REACT_APP_API}/create-history-product`, {
                        email: email,
                        game_name: game_name,
                        product_name: product_name,
                        product_price: product_price,
                        buy_method: buy_method
                      }, { withCredentials: true })
                        .then((response) => {
                          if (response.data.status) {
                            // navigate('/transaction')
                          } else {
                            // console.log("Error")
                          }
                        })
                        .catch((error) => {
                          console.log(error)
                        })
                    }
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              } else {
                console.log("สร้างสินค้าในไม่คลังสำเร็จ")
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
        if (distance <= 0) {
          clearInterval(interval);

        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });


  return (
    <div>
      {detail ?
        <div><div className='text-md'>เวลาที่เหลือ :</div>
          <div className='grid grid-flow-col gap-2 text-center auto-cols-max'>
            <div className='flex flex-col p-2 bg-shadow-info/40 rounded-box text-neutral-content'>
              <span className='font-mono text-xl font-semibold countdown text-shadow-primary'>
                <span style={{ "--value": day }}></span>
              </span>
            </div>
            <div className='flex flex-col p-2 bg-shadow-info/40 rounded-box text-neutral-content'>
              <span className='font-mono text-xl font-semibold countdown text-shadow-primary'>
                <span style={{ "--value": hour }}></span>
              </span>
            </div>
            <div className='flex flex-col p-2 bg-shadow-info/40 rounded-box text-neutral-content'>
              <span className='font-mono text-xl font-semibold countdown text-shadow-primary'>
                <span style={{ "--value": minute }}></span>
              </span>
            </div>
            <div className='flex flex-col p-2 bg-shadow-info/40 rounded-box text-neutral-content'>
              <span className='font-mono text-xl font-semibold countdown text-shadow-primary'>
                <span style={{ "--value": second }}></span>
              </span>
            </div>
          </div>
        </div> :
        <div><div className='text-xl'>เวลาที่เหลือ :</div>
          <div className='grid grid-flow-col gap-5 text-center auto-cols-max'>
            <div className='flex flex-col p-2 bg-shadow-info/40 rounded-box text-neutral-content'>
              <span className='font-mono text-5xl font-semibold countdown text-shadow-primary'>
                <span style={{ "--value": day }}></span>
              </span>
            </div>
            <div className='flex flex-col p-2 bg-shadow-info/40 rounded-box text-neutral-content'>
              <span className='font-mono text-5xl font-semibold countdown text-shadow-primary'>
                <span style={{ "--value": hour }}></span>
              </span>
            </div>
            <div className='flex flex-col p-2 bg-shadow-info/40 rounded-box text-neutral-content'>
              <span className='font-mono text-5xl font-semibold countdown text-shadow-primary'>
                <span style={{ "--value": minute }}></span>
              </span>
            </div>
            <div className='flex flex-col p-2 bg-shadow-info/40 rounded-box text-neutral-content'>
              <span className='font-mono text-5xl font-semibold countdown text-shadow-primary'>
                <span style={{ "--value": second }}></span>
              </span>
            </div>
          </div>
        </div>}

    </div>
  );
};

export default CountdownTimer;