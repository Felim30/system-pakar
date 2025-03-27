export const dataGejala = [
    {
        id: 1,
        name : 'Gatal - gatal pada malam hari'
    },
    {
        id: 2,
        name : 'Mengalami gangguan tidur pada malam hari'
    },
    {
        id : 3,
        name : 'kemerahan pada kulit'
    },
    {
        id : 4,
        name : 'gatal pada bagian kaki'
    }
]

export const dataPenyakit = [
    {
        id: 1,
        nama : 'Scabies',
        gejala : [1,2,3]
    },
    {
        id: 2,
        nama: 'tinea',
        gejala : [1,4]
    }
]

export const cekKondisi = (conditions : number[]) : string => {

    for(const penyakit of dataPenyakit){
        if (penyakit.gejala.every(gejala => conditions.includes(gejala))) {
            return penyakit.nama;
        }
    }

    return 'sehat'
}