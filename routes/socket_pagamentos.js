const axios = require('axios')
const { Router, response } = require('express')
const router = Router()
const {MercadoPagoConfig, Payment} = require('mercadopago')
const controller = require("../controller/socket_pagamentos")
const { socket } = require('../model/socket_pagamentos')

router.post('/campeonato/pagar/:fk_id_time/:fk_id_campeonato', (req, res) =>{
    
    
    const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN_MP });
    const payment = new Payment(client);

    const {fk_id_time, fk_id_campeonato} = req.params 

    const user = req.body
    console.log(user)
    const name = user.name.split(" ")
    const valor = parseFloat(user.valor)
    user.valor = valor
    payment.create({ body: {
        transaction_amount: valor,
        description: 'Pagamento CBPATIO',
        payment_method_id: 'pix',
        payer: {
            "email": user.email,
            "first_name": name[0],
            "last_name": name[name.length -1],
            "identification": {
                "type": "cellphone",
                "number": user.telefone
            }
        },
        notification_url: "https://eoyyfylmpdd5zux.m.pipedream.net"
    } })
    .then((resp) => {
        res.status(201).json(resp)
        console.log('Aguardando pagamento, QRCODE -> ', resp.point_of_interaction.transaction_data.qr_code)
        getStatusPayment(req, res, resp.id, fk_id_campeonato, fk_id_time, valor)
    }
    ).catch(console.log);
})

const getStatusPayment = (req, res, id_pagamento, fk_id_campeonato = "", fk_id_time = "", valor = "") => {
    console.log(`https://api.mercadopago.com/v1/payments/${id_pagamento}`)

    axios.get(`https://api.mercadopago.com/v1/payments/${id_pagamento}`,{
        headers:{
            'Authorization': `Bearer ${process.env.ACCESS_TOKEN_MP}`
        }
    }).then(async response => {
            try{
                console.log(fk_id_campeonato, fk_id_time)
                if(response.data.status === "approved"){
                    try{
                        await axios.post(`https://cbpatio-production.up.railway.app/campeonatos/inscrever/pagamentos`, {
                            "fk_id_time": fk_id_time,
                            "fk_id_campeonato": fk_id_campeonato,
                            "valor_pagamento": valor
                        })
                    }catch(e){
                        console.log(e)
                    }
                    controller.onPaymentApproved(`PAGO ${id_pagamento}`)
                    return
                }else if(response.data.status === "cancelled"){
                    console.log('CANCELADO')
                    controller.left("SAIU")
                    return
                }
                else{
                    setTimeout(() => getStatusPayment(req, res, id_pagamento, fk_id_campeonato, fk_id_time, valor), 2000);
                    
                    //ele ta excluindo ate o pagamento que foi aprovado.
                    setTimeout(async () => {
                        axios.get(`https://api.mercadopago.com/v1/payments/${id_pagamento}`, {
                            headers: {
                                'Authorization': `Bearer ${process.env.ACCESS_TOKEN_MP}`
                            }
                        }).then(
                            async (data) => {
                                if(data.data.status == 'pending'){
                                    await axios.put(`https://api.mercadopago.com/v1/payments/${id_pagamento}`, {
                                        status: 'cancelled'
                                    }, {
                                        headers: {
                                            'Authorization': `Bearer ${process.env.ACCESS_TOKEN_MP}`
                                        }
                                    })
                                }
                            }
                        )
                        return
                    }, 600000);

                    return
                }
            }catch(e){
                console.log('erro tal ->', e)
                return
            }
        }
    )
}   

router.put('/cancelar/:id_payment', async (req, res) => {
    const {id_payment} = req.params
    await axios.put(`https://api.mercadopago.com/v1/payments/${id_payment}`, {status: "cancelled"},{
        headers: {
            'Authorization': `Bearer ${process.env.ACCESS_TOKEN_MP}`
        }
    })
    console.log("cancelou")
    controller.left("SAIU")
})


module.exports = router