<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         $this->call(AccountTableSeeder::class);
    }
}

class AccountTableSeeder extends Seeder {

    public function run()
    {
        DB::table('accounts')->delete();
        DB::table('accounts')->insert([
            'name' => 'Koneet ja kalusto',
            'number' => 1200,
            'type' => 'varallisuus',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Sijoitukset',
            'number' => 1400,
            'type' => 'varallisuus',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Aineet ja tarvikkeet',
            'number' => 1501,
            'type' => 'varallisuus',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Myyntisaamiset',
            'number' => 1701,
            'type' => 'varallisuus',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Arvonlisäverosaamiset',
            'number' => 1763,
            'type' => 'varallisuus',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Oma pääoma',
            'number' => 2000,
            'type' => 'varallisuus',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Osakepääoma',
            'number' => 2001,
            'type' => 'varallisuus',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Edellisten tilikausien voitto/tappio',
            'number' => 2200,
            'type' => 'varallisuus',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Yksityisnostot rahana',
            'number' => 2365,
            'type' => 'velka',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Myyntisaamisten ALV-velka',
            'number' => 2942,
            'type' => 'varallisuus',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Yksityissijoitukset rahana',
            'number' => 2361,
            'type' => 'varallisuus',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Pitkäaikaiset lainat',
            'number' => 2621,
            'type' => 'velka',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Lyhytaikaiset lainat',
            'number' => 2825,
            'type' => 'velka',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Ostovelat',
            'number' => 2871,
            'type' => 'velka',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Arvonlisäverovelka',
            'number' => 2939,
            'type' => 'velka',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Muut lyhytaikaiset velat',
            'number' => 2949,
            'type' => 'velka',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Materiaaliostot',
            'number' => 4000,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Maksetut arvonlisäverot',
            'number' => 2940,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Myynnin valuuttakurssitappiot',
            'number' => 3582,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Yhteisötavarahankinnat',
            'number' => 4110,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Ostot tuonti',
            'number' => 4130,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Alihankinta',
            'number' => 4450,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Yhteisöpalveluhankinnat',
            'number' => 4470,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Työntekijäpalkat',
            'number' => 5000,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'YEL-maksut',
            'number' => 6100,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'TyEl-maksut',
            'number' => 6130,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Sosiaaliturvamaksut',
            'number' => 6300,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Tapaturmavakuutusmaksut',
            'number' => 6400,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Työttömyysvakuutusmaksut',
            'number' => 6410,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Sisäiset palaverit ja henkilökuntajuhlat',
            'number' => 7010,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Työterveyshuolto',
            'number' => 7050,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Kahvitarvikkeet',
            'number' => 7110,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Vuokrat',
            'number' => 7230,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Ajoneuvokulut',
            'number' => 7610,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Atk-laite ja ohjelmistokulut',
            'number' => 7700,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Koneiden ja kaluston pienhankinnat',
            'number' => 7750,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Matkaliput',
            'number' => 7800,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Taksikulut',
            'number' => 7810,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Hotelli- ja majoituskulut',
            'number' => 7820,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Ruokailut matkalla',
            'number' => 7830,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Muut matkakulut',
            'number' => 7860,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Muut edustuskulut',
            'number' => 7990,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Myynnin edistämiskulut',
            'number' => 8230,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Taloushallintopalvelut',
            'number' => 8380,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Puhelin- ja tietoliikennekulut',
            'number' => 8500,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Vakuutukset',
            'number' => 8580,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Toimistotarvikkeet',
            'number' => 8620,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Kokous- ja neuvottelukulut',
            'number' => 8650,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Muut kulut',
            'number' => 8760,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Muut korkokulut',
            'number' => 9550,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Satunnaiset kulut',
            'number' => 9740,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Ennakkoverot',
            'number' => 9900,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Muut välittömät verot',
            'number' => 4000,
            'type' => 'meno',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Poistot muista pitkävaikutteisista menoista',
            'number' => 6850,
            'type' => 'poisto',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Poisto rakennuksista ja rakennelmista',
            'number' => 6860,
            'type' => 'poisto',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Poisto koneista ja kalustosta',
            'number' => 6870,
            'type' => 'poisto',
        ]);
        DB::table('accounts')->insert([
            'name' => 'Poisto muista aineellisista hyödykkeistä',
            'number' => 6890,
            'type' => 'poisto',
        ]);
    }

}
