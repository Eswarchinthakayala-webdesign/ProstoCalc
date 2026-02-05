import Foundation

struct TreatmentCostResponse: Codable {
    let result: String
}

class CostEstimatorAPI {
    // Replace with your actual deployed Vercel URL
    static let baseURL = "https://prosto-calc.vercel.app" 
    
    static func analyzeTreatmentCost(details: String, completion: @escaping (Result<String, Error>) -> Void) {
        guard let url = URL(string: "\(baseURL)/api/explain-cost") else {
            completion(.failure(NSError(domain: "InvalidURL", code: 0, userInfo: nil)))
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body: [String: Any] = ["userPrompt": details]
        
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: body)
        } catch {
            completion(.failure(error))
            return
        }
        
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }
            
            guard let data = data else {
                completion(.failure(NSError(domain: "NoData", code: 0, userInfo: nil)))
                return
            }
            
            do {
                let decodedResponse = try JSONDecoder().decode(TreatmentCostResponse.self, from: data)
                completion(.success(decodedResponse.result))
            } catch {
                completion(.failure(error))
            }
        }
        task.resume()
    }
}

// Usage Example:
// CostEstimatorAPI.analyzeTreatmentCost(details: "Root canal for molar, have insurance") { result in
//     switch result {
//     case .success(let explanation):
//         print("Cost Explanation: \(explanation)")
//     case .failure(let error):
//         print("Error: \(error.localizedDescription)")
//     }
// }
