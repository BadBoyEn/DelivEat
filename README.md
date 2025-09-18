PROGETTO ESAME UNIVERSITARIO - DOCENTE FERRARA
Made by Antonio Scarano, Domenico Morrea, Massimo Milani

Il progetto DelivEat è una piattaforma di una dark kitchen, adottando un'architettura MVC modulare lato BackEnd, basata su microservizi e microfrontend.
Il sistema distingue i ruoli di Manager, Rider e Cliente, garantendo un flusso completo, dove:
-Cliente effettua un'ordine e ne segue lo stato;
-Rider può prendere in carico un solo ordine alla volta fino al suo stato di completamento;
-Manager ha una visione complessiva dell'andamento tramite Dashboard.

Inoltre nel progetto sono stati adottati anche metriche di sicurezza quali JWT per l'autenticazione, l'hashing della password, middleware di sicurezza e rate limiting.

Il database utilizzato è MongoDb Atlas per garantire disponibilità e scalabilità.

Per il deployment si è pensato di utilizzare GitHub-Pages.

Sono previsti anche degli sviluppi futuri per migliorare l'infrastruttura, la robustezza del sistema, ma anche nuove implementazioni.