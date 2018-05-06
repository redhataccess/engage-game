#!/bin/bash

INCREMENT=1

curl "http://localhost:3000/bscan/?AccountId=10${INCREMENT}&EventId=2081&Salutation=Mr.&Firstname=John${INCREMENT}&Lastname=Smith&Middlename=A&Suffix=Esq.&Title=Executive+Supervising+Bartender&Company=Acme+Inc.&Division=IT+Department&Address1=123+Any+Street&Address2=Block+2&Address3=Apartment+3&City=Bethesda&State=MD&Zip=90210&Country=USA&TelCountryCode=64&Phone1=111+555+1111&Phone2=111+555+2222&Fax=111+555+33333&Email=jsmith%40acmeinc.com&URL=www.acmeinc.com&PubCodes=A4%2CB1%2CC8&PrivCodes=AT%2CEX%2CEO&EncodeAux1=Aux+1&EncodeAux2=Aux+2&EncodeAux3=Aux+3&EncodeAux4=Aux+4&EncodeAux5=Aux+5&Friendly=Jeff+Test"
