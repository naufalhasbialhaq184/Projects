let list_data_nemu = [
    {
        nama_barang : "Macbook Air M4",
        deskripsi_barang : "warna Skyblue",
        waktu_menemukan : "01/07/2026T18:00PM",
        tempat_menemukan : "Koica ITB Jatinangor",
        contact_person_penemu : "IG @nhasbialhaq184"
    }
]
let list_data_hilang =[
    {
        nama_barang : "Macbook Air M4",
        deskripsi_barang : "warna Skyblue",
        waktu_kehilangan : "01/07/2026T18:00PM",
        tempat_kehilangan : "Koica ITB Jatinangor",
        contact_person_kehilangan : "IG @nhasbialhaq184"
    }
]

const menambahkan_barang_nemu = function(){
    document.forms["nemu_barang"].onsubmit = (event) =>{
        event.preventDefault()
        
        list_data_nemu.push({
            nama_barang : document.forms["nemu_barang"]["nama_barang"].value,
            deskripsi_barang : document.forms["nemu_barang"]["deskripsi_barang"].value,
            waktu_menemukan : document.forms["nemu_barang"]["waktu_menemukan"].value,
            tempat_menemukan : document.forms["nemu_barang"]["tempat_menemukan"].value,
            contact_person_penemu : document.forms["nemu_barang"]["contact_person_penemu"].value,
        })

        document.forms["nemu_barang"].reset()
        alert("Data Barang sudah ditambahkan")
        update_list_nemu()

    }
    
}

const update_list_nemu = function(){
    const container = document.getElementById("list_nemu")
    const header_list_nemu = `<p class="font_list_head">List Barang Yang Ditemukan</p>`
    container.innerHTML = header_list_nemu

    list_data_nemu.forEach((value, index) =>{
        const new_div = document.createElement("div")
        new_div.className = `barang barang_nemu${index}`
        new_div.id = `barang_nemu${index}`
        new_div.innerHTML = `
            <p>Nama Barang : ${value.nama_barang}</p>
            <p>Deskripsi Barang : ${value.deskripsi_barang}</p>
            <p>Waktu Menemukan : ${value.waktu_menemukan}</p>
            <p>Tempat Menemukan : ${value.tempat_menemukan}</p>
            <p>Contact Person Penemu: ${value.contact_person_penemu}</p>
        `
        new_div.onclick = () =>{
            const konfirmasi = confirm("Apakah kamu ingin mengambil barang ini?, jika ya silahkan hubungi penemu")
            if(konfirmasi){
                alert(`Barang akan dihapus dari list, silahkan hubungi ${value.contact_person_penemu}`)
                
                list_data_nemu.splice(index, 1)
            }
            update_list_nemu()
        }
        container.appendChild(new_div)
    })
}

const menambahkan_barang_hilang = function(){
    return  document.forms["hilang_barang"].onsubmit = (event) =>{
        event.preventDefault()
        
        list_data_hilang.push({
            nama_barang : document.forms["hilang_barang"]["nama_barang"].value,
            deskripsi_barang : document.forms["hilang_barang"]["deskripsi_barang"].value,
            waktu_kehilangan : document.forms["hilang_barang"]["waktu_kehilangan"].value,
            tempat_kehilangan : document.forms["hilang_barang"]["tempat_kehilangan"].value,
            contact_person_kehilangan : document.forms["hilang_barang"]["contact_person_kehilangan"].value,
        })

        document.forms["hilang_barang"].reset()
        alert("Data Barang sudah ditambahkan")
        update_list_hilang()
    }
    
}
const update_list_hilang = function(){
    const container = document.getElementById("list_hilang")
    const header_list_hilang = `<p class="font_list_head">List Barang Yang Hilang</p>`
    container.innerHTML = header_list_hilang

    list_data_hilang.forEach((value, index) =>{
        const new_div = document.createElement("div")
        new_div.className = `barang barang_hilang${index}`
        new_div.id = `barang_hilang${index}`
        new_div.innerHTML = `
            <p>Nama Barang : ${value.nama_barang}</p>
            <p>Deskripsi Barang : ${value.deskripsi_barang}</p>
            <p>Waktu Kehilangan : ${value.waktu_kehilangan}</p>
            <p>Tempat Kehilangan : ${value.tempat_kehilangan}</p>
            <p>Contact Person Kehilangan: ${value.contact_person_kehilangan}</p>
        `
        new_div.onclick = () =>{
            const konfirmasi = confirm("Apakah kamu ingin menemukan barang ini?, jika ya silahkan hubungi yang kehilangan")
            if(konfirmasi){
                alert(`Barang akan dihapus dari list, silahkan hubungi ${value.contact_person_kehilangan}`)
                
                list_data_hilang.splice(index, 1)
            }
            update_list_hilang()
        }
        container.appendChild(new_div)
    })
}

update_list_nemu()
menambahkan_barang_nemu()
update_list_hilang()
menambahkan_barang_hilang()