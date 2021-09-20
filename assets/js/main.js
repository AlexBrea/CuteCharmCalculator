"use strict";

(function ($) {

	const CuteCharm = {
		cuteCharm_btn : $( ".js-cc-btn" ),
		logContainer	:	$( ".js-cc-log" ),
		natureList : [
			"Hardy",
			"Lonely",
			"Brave",
			"Adamant",
			"Naughty",
			"Docile",
			"Relaxed",
			"Impish",
			"Lax",
			"Timid",
			"Hasty",
			"Serious",
			"Jolly",
			"Naive",
			"Modest",
			"Mild",
			"Quiet",
			"Bashful",
			"Rash",
			"Calm",
			"Gentle",
			"Sassy",
			"Careful",
			"Quirky"
		],
		genderList : [
			0,
			50,
			75,
			150,
			200
		],
		init: () => {
			$( CuteCharm.cuteCharm_btn ).on( 'click', CuteCharm.calc );
		},
		log: ( type = "success", msg ) => {
			CuteCharm.logContainer.append(`<p class="alert-${type} rounded shadow-sm p-2">${msg}</p>`);
		},
		calc: () => {
			
			var tid, sid, num, num2, hab, gend, prob, bFinded = false;
			
			CuteCharm.logContainer.empty();

			tid = parseInt($('.js-trainer-ID').val(), 10);
			sid = parseInt($('.js-trainer-secret-ID').val(), 10);

			if ( isNaN( tid ) || isNaN( sid ) || tid < 0 || sid < 0 ) {
				CuteCharm.log( 'danger', 'The ID or Secret ID is not valid');
				return false;
			}
			
			num = 0;

			while (num < CuteCharm.genderList.length) {
				
				num2 = CuteCharm.genderList[num];
				
				while ( num2 < CuteCharm.genderList[num] + CuteCharm.natureList.length ) {
					
					if ((tid ^ sid ^ num2) < 8) {
						
						bFinded = true;
						hab = num2 % 2;
						gend = '';
						prob = '';
						
						switch (num) {
							case 0:
								gend = 'Male';
								prob = '<b>be male or female</b>';
								break;
						case 1:
								gend = 'female';
								prob = '<b>75% of being male</b>';
								break;
						case 2:
								gend = 'female';
								prob = '<b>75% of being male</b>';
								break;
						case 3:
								gend = 'female';
								prob = '<b>75% of being male</b>';
								break;
						case 4:
								gend = 'female';
								prob = '<b>75% of being male</b>';
								break;
						}
						CuteCharm.log(
							'success',
							`Using a Pokémon <b>${gend}</b> with <b>cute charm</b>, nature <b>${CuteCharm.natureList[num2 - CuteCharm.genderList[num]]}</b> and ability <b>${hab.toString()}</b>: You can get a Shiny pokemon with a probability of ${prob}.`
						);
					}

					num2++;
				}

				num++;
			}

			if (!bFinded) {
				CuteCharm.log(
					'danger',
					`<b>The ID combination ${tid} and ${sid} cannot benefit from Cute Charm abuse</b>.<br><br>
					Normally, this is solved by placing the same value in Trainer ID and Trainer Secret ID, but <b>BE CAREFUL</b>, the pokemons you have captured will appear as if <b>they were from another trainer</b> since you have modified the ID, so I recommend that you <b>copy the value of the Trainer Secret ID inside the Trainer ID and not the other way around</b>.`);
			}

		},

	}
	
	$(document).ready(function () {
	
		$.getJSON( "assets/js/data/data.json", function(json) {
			
			json.forEach(function (pkm) {
				const toInsert = `
				<tr>
					<td class="align-middle">${pkm.id}</td>
					<td class="align-middle"><img class="c-cutec__sprite" src="${pkm.sprite}"></td>
					<td class="align-middle">${pkm.name}</td>
				</tr>`;

					$( '.js-cc-table' ).append( toInsert );
			});

		});

		CuteCharm.init();

		/* Scroll button */
		const scrollButton = $('.js-scroll');

		$( window ).scroll(function() {
			if ( $( window ).scrollTop() + $( window ).height() > $( document ).height() - 150 ) {
				
				/* User is in bottom of page */
				if (scrollButton.hasClass('js-to-bottom')) {
					scrollButton.addClass('js-to-top');
					scrollButton.removeClass('js-to-bottom');

					scrollButton.toggleClass("rotate");

				}

			}
			else {
				/* User is not on bottom of page */
				if (scrollButton.hasClass('js-to-top')) {
					scrollButton.addClass('js-to-bottom');
					scrollButton.removeClass('js-to-top');

					scrollButton.toggleClass("rotate");

				}

			}
		});

		/* Lets make magic and scroll */
		scrollButton.on('click', function (e) {
			e.preventDefault();

			if (scrollButton.hasClass('js-to-bottom')) {
				$("html, body").animate( { scrollTop: $( document ).height() - $( window ).height() } );
			}
			else {
				$("html, body").animate( { scrollTop: 0 } );
			}

		})
		
	})

})(jQuery);