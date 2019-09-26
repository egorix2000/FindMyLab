from flask import Flask
app = Flask(__name__)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

import pandas as pd
import numpy as np
from flask import request, jsonify

#app.secret_key = b'\x99\xa4\x11\xdc\xe5\xef\xac\xf3\x1f"(\x8bD]"\xf7'

lab_data = pd.read_csv(str('labdata.csv'), index_col=0, header=None).T

lab_data['city'] = 'Moscow' # It's not in the database now

def get_sublist(table, key, value):
    if value!='empty':
        return table[table[key] == value]
    return table

@app.route('/cities', methods=['GET', 'POST'])
def getCities():
    cities = list(np.unique(lab_data['city'].values))
    answer = {'cities': cities}
    return jsonify(answer)


@app.route('/universities', methods=['GET', 'POST'])
def getUniversities():
    input_json = request.get_json(force=True)
    city = input_json['city']
    labs_city = get_sublist(lab_data, 'city', city)
    unis = list(np.unique(labs_city['organisation'].dropna().values))
    answer = {'universities': unis}
    return jsonify(answer)


@app.route('/subfields', methods=['GET', 'POST'])
def getSubfields():
    input_json = request.get_json(force=True)
    field = input_json['field']
    labs_subj = get_sublist(lab_data, 'field', field)
    subfields = list(np.unique(labs_subj['subfield'].dropna().values))
    answer = {'subfields': subfields}
    return jsonify(answer)


@app.route('/subjects', methods=['GET', 'POST'])
def getSubjects():
    input_json = request.get_json(force=True)
    city = input_json['city']
    university = input_json['organisation']
    labs_city = get_sublist(lab_data, 'city', city)
    labs_city_uni = get_sublist(labs_city, 'organisation', university)
    subjects = list(np.unique(labs_city_uni['field'].dropna().values))
    answer = {'subjects': subjects}
    return jsonify(answer)


@app.route('/top', methods=['GET', 'POST'])
def getTop():
    input_json = request.get_json(force=True)
    city = input_json['city']
    university = input_json['organisation']
    subject = input_json['subject']

    labs_city = get_sublist(lab_data, 'city', city)
    labs_city_uni = get_sublist(labs_city, 'organisation', university)
    labs_city_uni_subj = get_sublist(labs_city_uni, 'field', subject)
    searchText = input_json.get('searchText')

    labs_city_uni_subj = labs_city_uni_subj.fillna(
        {
            'title': 'No title',
            'organisation': 'Unknown university',
            'head of the lab': 'Unknown head',
            'keywords': 'No keywords'
        }
    )
    labs_answer = [{'name': labs_city_uni_subj['title'].values[i],
                   'university': labs_city_uni_subj['organisation'].values[i],
                   'head': labs_city_uni_subj['head of the lab'].values[i],
                    'keywords': labs_city_uni_subj['keywords'].values[i]}
                    for i in range(labs_city_uni_subj.shape[0])]

    answer = {'laboratories': labs_answer}
    return jsonify(answer)

if __name__ == '__main__':
    app.run()